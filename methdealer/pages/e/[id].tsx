import React from 'react';
import { Page } from '../../components/Page';
import Router from 'next/router'
import { Calculator } from '../../functions/calculator';
import { Equation, GTTopics } from '../../types/calculator';
import { InlineMath, BlockMath } from 'react-katex';
import {withRouter, SingletonRouter} from 'next/router'


interface EMathEquationPageProps {
  topics: GTTopics;
  health: boolean;
  router: SingletonRouter;
  equation: Equation
}

class EMathEquationPage extends React.Component<EMathEquationPageProps> {

  static getInitialProps({ query }) {
    return new Promise<{ equation: Equation; topics: GTTopics; health: boolean }>((resolve) => {
      Promise.all([Calculator.getEquation(query.id), Calculator.initialize("e")]).then((res) => {
        resolve({ equation: res[0], ...res[1] })
      }).catch((e) => console.log(e))
    })
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <Page currentlySelected={this.props.router.query.id as string} topics={this.props.topics} difficulty="e" health={this.props.health}>
        <div style={{ display: 'flex', padding: 48, flexDirection: 'column' }}>
          <h1>{this.props.equation.title}</h1>
          <h6>{this.props.equation.topic}</h6>
          <BlockMath math='\int_0^\infty x^2 dx'></BlockMath>
        </div>
      </Page>
    )
  }
}

export default withRouter(EMathEquationPage)