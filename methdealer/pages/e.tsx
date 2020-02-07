import React from 'react';
import {Page} from '../components/Page'
import { Calculator } from '../functions/calculator';

class EMathPage extends React.Component {
    static getInitialProps() {
        Calculator.healthCheck().then((health) => {
            console.log(health)
        })
        return {}
    }
    render() {
        return (
            <Page>
            </Page>
        )
    }
}

export default EMathPage