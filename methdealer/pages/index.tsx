import React from 'react';
import { Page } from '../components/Page';
import Router from 'next/router'

class IndexPage extends React.Component {
  componentDidMount() {
    Router.push(localStorage.getItem("page") || "/e")
  }
  render() {
    return null
  }
}

export default IndexPage