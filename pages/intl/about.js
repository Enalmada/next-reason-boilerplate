/* eslint no-unused-vars: 0 */

import React, {Component} from "react";
import {FormattedRelative} from "react-intl";
import Layout from "../../components/intl/Layout";

class About extends Component {
    static async getInitialProps({req}) {
        return {someDate: Date.now()};
    }

    render() {
        return (
            <Layout>
                <p>
                    <FormattedRelative
                        value={this.props.someDate}
                        updateInterval={1000}
                    />
                </p>
            </Layout>
        );
    }
}

export default About;
