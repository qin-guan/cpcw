import React from 'react';
import { Page } from '../../components/Page';
import Router from 'next/router'
import { Calculator } from '../../functions/calculator';
import { Equation, GTTopics } from '../../types/calculator';
import { InlineMath, BlockMath } from 'react-katex';
import {withRouter, SingletonRouter} from 'next/router'

interface AMathEquationPageProps {
  topics: GTTopics;
  health: boolean;
  equation: Equation;
  router: SingletonRouter
}

class AMathEquationPage extends React.Component<AMathEquationPageProps> {

  static getInitialProps({ query }) {
    return new Promise<{ equation: Equation; topics: GTTopics; health: boolean }>((resolve) => {
      Promise.all([Calculator.getEquation(query.id), Calculator.initialize("a")]).then((res) => {
        resolve({ equation: res[0], ...res[1] })
      }).catch((e) => console.log(e))
    })
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <Page currentlySelected={this.props.router.query.id as string} topics={this.props.topics} difficulty="a" health={this.props.health}>
        <div style={{ display: 'flex', padding: 48, flexDirection: 'column' }}>
          <h1 style={{fontWeight: 'bold'}}>{this.props.equation.title}</h1>
          <h5>{this.props.equation.topic}</h5>
          <BlockMath math={"\\huge" + this.props.equation.formula}></BlockMath>
        </div>
      </Page>
    )
  }
}

export default withRouter(AMathEquationPage)