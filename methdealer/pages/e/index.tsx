import React from 'react';
import { Page } from '../../components/Page'
import { Calculator } from '../../functions/calculator';
import { GTTopics } from '../../types/calculator';

interface EMathPageState {
}

interface EMathPageProps {
  topics: GTTopics;
  health: boolean
}

class EMathPage extends React.Component<EMathPageProps, EMathPageState> {

  static getInitialProps(): Promise<{ topics: GTTopics; health: boolean }> {
    return new Promise<{ topics: GTTopics; health: boolean }>((resolve) => {
      Calculator.initialize("e").then((d) => resolve(d)).catch((e) => console.log(e))
    })
  }

  render() {
    return (
      <Page topics={this.props.topics} difficulty="e" health={this.props.health}>
      </Page>
    )
  }
}

export default EMathPage