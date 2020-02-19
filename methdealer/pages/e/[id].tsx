import React from 'react';
import { Page } from '../../components/Page';
import Router from 'next/router'
import { Calculator } from '../../functions/calculator';
import { Equation, GTTopics } from '../../types/calculator';
import { InlineMath, BlockMath } from 'react-katex';
import { withRouter, SingletonRouter } from 'next/router'
import { EquationHeader } from '../../components/EquationHeader';
import { Loading, Modal, TextInput } from 'carbon-components-react'
import {Calculate} from '../../components/Calculate'

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
  alternativeModal: boolean
}

class EMathEquationPage extends React.Component<EMathEquationPageProps, EMathEquationPageState> {
  state = {
    width: 0,
    height: 0,
    modal: false,
    alternativeModal: false
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
              <BlockMath math={"\\huge " + i} />
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
            <EquationHeader toggleAlternativeModal={() => this._toggleAlternativeModal()} alternative={!!this.props.equation.alternative} toggleModal={() => this._toggleModal()} legend={!!this.props.equation.legend} formula={this.props.equation.formula} title={this.props.equation.title} topic={this.props.equation.topic} width={this.state.width} />
            {this.props.equation.description ? (
              <div style={{ marginTop: 30 }}>
                <h3 style={{
                  fontWeight: 'bold',
                  marginBottom: 10
                }}>
                  Description
              </h3>
                <p style={{
                  whiteSpace: 'pre-wrap'
                }}>{this.props.equation.description}</p>
              </div>
            ) : null}
            <div style={{marginTop: 30}}>
            <Calculate width={this.state.width} calculation_vars={this.props.equation.calculation_vars}/>
            </div>
          </div>
        )}
      </Page>
    )
  }
}

export default withRouter(EMathEquationPage)