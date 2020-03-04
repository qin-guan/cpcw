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
import {FormulaInfo} from '../../components/FormulaInfo'

interface AMathEquationPageProps {
  topics: GTTopics;
  health: boolean;
  equation: Equation;
  router: SingletonRouter
}

interface AMathEquationPageState {
  width: number;
  height: number;
  modal: boolean;
  alternativeModal: boolean;
  answer: string;
  simplifyAnswer: string;
  factorAnswer: string;
  expandAnswer: string;
}

class AMathEquationPage extends React.Component<AMathEquationPageProps, AMathEquationPageState> {
  state = {
    height: 0,
    width: 0,
    modal: false,
    alternativeModal: false,
    answer: "",
    simplifyAnswer: "",
    factorAnswer: "",
    expandAnswer: ""
  }

  static getInitialProps({ query }) {
    return new Promise<{ equation: Equation; topics: GTTopics; health: boolean }>((resolve) => {
      Promise.all([Calculator.getEquation(query.id), Calculator.initialize("a")]).then((res) => {
        resolve({ equation: res[0], ...res[1] })
      }).catch((e) => console.log(e))
    })
  }

  componentDidMount() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", () => this.setState({ width: window.innerWidth, height: window.innerHeight }))
    if (this.props.equation.difficulty === "e") {
      window.location.href = "/e/" + this.props.router.query.id
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
      <Page currentlySelected={this.props.router.query.id as string} topics={this.props.topics} difficulty="a" health={this.props.health}>
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
        {this.props.equation.difficulty === 'e' ? <Loading /> : (
          <FormulaInfo onCalculate={(type, vars) => {
            switch (type) {
              case "expand":
                Calculator.calculateValue(this.props.equation.id, vars).then((v) => this.setState({ expandAnswer: v })).catch((e) => console.error(e))
                break
              case "simplify":
                Calculator.calculateValue(this.props.equation.id, vars).then((v) => this.setState({ simplifyAnswer: v })).catch((e) => console.error(e))
                break
              case "eval":
                Calculator.calculateValue(this.props.equation.id, vars).then((v) => this.setState({ answer: v })).catch((e) => console.error(e))
                break
            }
          }} height={this.state.height} width={this.state.width} equation={this.props.equation} answer={this.state.answer} simplifyAnswer={this.state.simplifyAnswer} expandAnswer={this.state.expandAnswer}/>
        )}
      </Page>
    )
  }
}

export default withRouter(AMathEquationPage)