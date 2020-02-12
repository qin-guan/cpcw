import React from 'react';
import Router from 'next/router'

class IndexPage extends React.Component {
    componentDidMount() {
        Router.push("/e")
    }
    render() {
        return null
    }
}

export default IndexPage