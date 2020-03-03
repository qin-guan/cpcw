import React from 'react';
import { Page } from '../../components/Page';
import Router from 'next/router'
import { Calculator } from '../../functions/calculator';
import { Equation, GTTopics } from '../../types/calculator';
import { InlineMath, BlockMath } from 'react-katex';
import { withRouter, SingletonRouter } from 'next/router'
import { EquationHeader } from '../../components/EquationHeader';
import { Loading, Modal, Accordion, AccordionItem } from 'carbon-components-react'
import { Evaluate } from '../../components/Evaluate'
import { BlockAnswer } from '../../components/BlockAnswer'
import { Simplify } from '../../components/Simplify';
import { LineChart, Line } from 'recharts';

interface EMathEquationPageProps {
  topics: GTTopics;
  health: boolean;
  router: SingletonRouter;
  equation: Equation
}

interface EMathEquationPageState {
  width: number;
  height: number;
  modal: boolean;
  alternativeModal: boolean;
  answer: string;
  simplifyAnswer: string;
}

class EMathEquationPage extends React.Component<EMathEquationPageProps, EMathEquationPageState> {
  state = {
    width: 0,
    height: 0,
    modal: false,
    alternativeModal: false,
    answer: "",
    simplifyAnswer: ""
  }

  static getInitialProps({ query }) {
    return new Promise<{ equation: Equation; topics: GTTopics; health: boolean }>((resolve) => {
      Promise.all([Calculator.getEquation(query.id), Calculator.initialize("e")]).then((res) => {
        resolve({ equation: res[0], ...res[1] })
      }).catch((e) => console.log(e))
    })
  }

  componentDidMount() {
    console.log(this.props.equation)
    this.setState({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", () => this.setState({ width: window.innerWidth, height: window.innerHeight }))
    if (this.props.equation.difficulty === "a") {
      window.location.href = "/a/" + this.props.router.query.id
      return
    }
  }

  _toggleModal() {
    this.setState({ modal: !this.state.modal })
  }

  _toggleAlternativeModal() {
    this.setState({ alternativeModal: !this.state.alternativeModal })
  }

  render() {
    return (
      <Page currentlySelected={this.props.router.query.id as string} topics={this.props.topics} difficulty="e" health={this.props.health}>
        <Modal passiveModal={true} open={this.state.alternativeModal} onRequestClose={() => this._toggleAlternativeModal()} primaryButton={false} modalHeading={"Alternative Equations"}>
          {this.props.equation.alternative.split("\\newline").map((i) => {
            return (
              <BlockMath math={"\\Huge " + i} />
            )
          })}
        </Modal>
        <Modal passiveModal={true} open={this.state.modal} onRequestClose={() => this._toggleModal()} primaryButton={false} modalHeading={"Equation Legend"}>
          <span style={{
            whiteSpace: 'pre-wrap'
          }}>{this.props.equation.legend}</span>
        </Modal>
        {this.props.equation.difficulty === 'a' ? <Loading /> : (
          <div style={{ display: 'flex', padding: 48, flexDirection: 'column', flex: 1 }}>
            {this.props.equation.formula !== "_" ? (
              <EquationHeader toggleAlternativeModal={() => this._toggleAlternativeModal()} alternative={this.props.equation.alternative !== "_"} toggleModal={() => this._toggleModal()} legend={this.props.equation.legend !== "_"} formula={this.props.equation.formula} title={this.props.equation.title} topic={this.props.equation.topic} width={this.state.width} />
            ) : null}
            {this.props.equation.description ? (
              <div style={{ marginTop: 30 }}>
                <h3 style={{
                  fontWeight: 'bold',
                  marginBottom: 10
                }}>
                  Description
              </h3>
                {this.props.equation.description !== "_" ? (
                  <p style={{
                    whiteSpace: 'pre-wrap'
                  }}>{this.props.equation.description}</p>
                ) : <span>This formula does not have a description</span>}
              </div>
            ) : null}
            <div style={{ marginTop: 30 }}>
              <h3 style={{ marginBottom: 10 }}>
                Calculator
              </h3>
              <Accordion>
                <AccordionItem title={"Evaluate"}>
                  {this.props.equation.calculation_formula !== "_" ? (
                    <>
                      <Evaluate formula={this.props.equation.formula} onCalculate={(vars) => {
                        Calculator.calculateValue(this.props.equation.id, vars).then((v) => this.setState({ answer: v })).catch((e) => console.error(e))
                      }} width={this.state.width} calculation_vars={this.props.equation.calculation_vars} />
                      <BlockAnswer katex={this.state.answer} units={this.props.equation.calculated_units} />
                    </>
                  ) : <span>Evaluate is not available for this equation</span>}
                </AccordionItem>
                <AccordionItem title={"Simplify"}>
                  {this.props.equation.simplify_formula !== "_" ? (
                    <>
                      <Simplify formula={this.props.equation.formula} onCalculate={(vars) => {
                        Calculator.calculateValue(this.props.equation.id, vars).then((v) => this.setState({ simplifyAnswer: v })).catch((e) => console.error(e))
                      }} width={this.state.width} calculation_vars={this.props.equation.calculation_vars} />
                      <BlockAnswer katex={this.state.simplifyAnswer} units={this.props.equation.calculated_units} />
                    </>
                  ) : <span>Simplify is not available for this equation</span>}
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </Page>
    )
  }
}

export default withRouter(EMathEquationPage)