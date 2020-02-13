import React from 'react';
import Router, {withRouter, SingletonRouter} from 'next/router'

class IndexPage extends React.Component<{router: SingletonRouter}> {
    componentDidMount() {
        window.location.href = "/e"
    }
    render() {
        return null
    }
}

export default withRouter(IndexPage)
