import React from 'react';
import { Page } from '../../components/Page';
import Router from 'next/router'
import { Calculator } from '../../functions/calculator';
import { Equation, GTTopics } from '../../types/calculator';
import { InlineMath, BlockMath } from 'react-katex';
import {withRouter, SingletonRouter} from 'next/router'
import { EquationHeader } from '../../components/EquationHeader';
import { Loading } from 'carbon-components-react'


interface EMathEquationPageProps {
  topics: GTTopics;
  health: boolean;
  router: SingletonRouter;
  equation: Equation
}

interface EMathEquationPageState {
  width: number;
  height: number
}

class EMathEquationPage extends React.Component<EMathEquationPageProps, EMathEquationPageState> {
  state = {
    width: 0,
    height: 0
  }

  static getInitialProps({ query }) {
    return new Promise<{ equation: Equation; topics: GTTopics; health: boolean }>((resolve) => {
      Promise.all([Calculator.getEquation(query.id), Calculator.initialize("e")]).then((res) => {
        resolve({ equation: res[0], ...res[1] })
      }).catch((e) => console.log(e))
    })
  }

  componentDidMount() {
    this.setState({width: window.innerWidth, height: window.innerHeight})
    window.addEventListener("resize", () => this.setState({width: window.innerWidth, height: window.innerHeight}))
    if (this.props.equation.difficulty === "a") {
      window.location.href = "/a/" + this.props.router.query.id
      return
    }
  }

  render() {
    return (
      <Page currentlySelected={this.props.router.query.id as string} topics={this.props.topics} difficulty="e" health={this.props.health}>
        {this.props.equation.difficulty === 'a' ? <Loading /> : (
          <div style={{ display: 'flex', padding: 48, flexDirection: 'column', flex: 1 }}>
            <EquationHeader formula={this.props.equation.formula} title={this.props.equation.title} topic={this.props.equation.topic} width={this.state.width}/>
            <div style={{ flex: 1 }}></div>
          </div>
        )}
      </Page>
    )
  }
}

export default withRouter(EMathEquationPage)