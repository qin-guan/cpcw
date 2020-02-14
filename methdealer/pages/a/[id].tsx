import React from 'react';
import { Page } from '../../components/Page';
import Router from 'next/router'
import { Calculator } from '../../functions/calculator';
import { Equation, GTTopics } from '../../types/calculator';
import { withRouter, SingletonRouter } from 'next/router'
import { EquationHeader } from '../../components/EquationHeader';
import { Loading, Modal } from 'carbon-components-react'

interface AMathEquationPageProps {
  topics: GTTopics;
  health: boolean;
  equation: Equation;
  router: SingletonRouter
}

interface AMathEquationPageState {
  width: number;
  height: number;
  modal: boolean
}

class AMathEquationPage extends React.Component<AMathEquationPageProps, AMathEquationPageState> {
  state = {
    height: 0,
    width: 0,
    modal: false
  }

  static getInitialProps({ query }) {
    return new Promise<{ equation: Equation; topics: GTTopics; health: boolean }>((resolve) => {
      Promise.all([Calculator.getEquation(query.id), Calculator.initialize("a")]).then((res) => {
        resolve({ equation: res[0], ...res[1] })
      }).catch((e) => console.log(e))
    })
  }

  componentDidMount() {
    this.setState({width: window.innerWidth, height: window.innerHeight})
    window.addEventListener("resize", () => this.setState({width: window.innerWidth, height: window.innerHeight}))
    if (this.props.equation.difficulty === "e") {
      window.location.href = "/e/" + this.props.router.query.id
      return
    }
  }

  render() {
    return (
      <Page currentlySelected={this.props.router.query.id as string} topics={this.props.topics} difficulty="a" health={this.props.health}>
        <Modal open={this.state.modal}>
        </Modal>
        {this.props.equation.difficulty === 'e' ? <Loading /> : (
          <div style={{ display: 'flex', padding: 48, flexDirection: 'column', flex: 1 }}>
            <EquationHeader legend={!!this.props.equation.legend} formula={this.props.equation.formula} title={this.props.equation.title} topic={this.props.equation.topic} width={this.state.width} toggleModal={() => this.setState({modal: !this.state.modal})}/>
            <div style={{ flex: 1 }}></div>
          </div>
        )}
      </Page>
    )
  }
}

export default withRouter(AMathEquationPage)