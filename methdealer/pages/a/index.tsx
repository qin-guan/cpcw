import React from 'react';
import { Page } from '../../components/Page'
import { Calculator } from '../../functions/calculator';
import { GTTopics } from '../../types/calculator';
import Router, { withRouter, SingletonRouter } from 'next/router'
import { SummaryTable } from '../../components/SummaryTable'

interface AMathPageState {
}

interface AMathPageProps {
  topics: GTTopics;
  health: boolean;
  router: SingletonRouter
}

class AMathPage extends React.Component<AMathPageProps, AMathPageState> {

  static getInitialProps(): Promise<{ topics: GTTopics; health: boolean }> {
    return new Promise<{ topics: GTTopics; health: boolean }>((resolve) => {
      Calculator.initialize("a").then((d) => resolve(d)).catch((e) => console.log(e))
    })
  }

  render() {
    const rows = []
    Object.keys(this.props.topics).forEach((topic) => {
      this.props.topics[topic].forEach((eqn) => {
        rows.push({ id: eqn.id.toString(), title: eqn.title, topic })
      })
    })
    return (
      <Page currentlySelected={this.props.router.query.id as string} topics={this.props.topics} difficulty="a" health={this.props.health}>
        <div style={{ flex: 1, padding: 50 }}>
          <SummaryTable rows={rows} tableTitle={"Additional Math"} onClick={id => Router.push("/a/" + id)}/>
        </div>
      </Page>
    )
  }
}

export default withRouter(AMathPage)