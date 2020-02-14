import React from 'react';
import { Page } from '../../components/Page'
import { Calculator } from '../../functions/calculator';
import { GTTopics } from '../../types/calculator';
import Router, {withRouter, SingletonRouter} from 'next/router'
import { SummaryTable } from '../../components/SummaryTable';

interface EMathPageState {
}

interface EMathPageProps {
  topics: GTTopics;
  health: boolean;
  router: SingletonRouter
}

class EMathPage extends React.Component<EMathPageProps, EMathPageState> {

  static getInitialProps(): Promise<{ topics: GTTopics; health: boolean }> {
    return new Promise<{ topics: GTTopics; health: boolean }>((resolve) => {
      Calculator.initialize("e").then((d) => resolve(d)).catch((e) => console.log(e))
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
      <Page currentlySelected={this.props.router.query.id as string} topics={this.props.topics} difficulty="e" health={this.props.health}>
        <div style={{ flex: 1, padding: 50 }}>
          <SummaryTable rows={rows} tableTitle={"Elementary Mathematics"} onClick={id => Router.push("/e/" + id)}/>
        </div>
      </Page>
    )
  }
}

export default withRouter(EMathPage)