import React, {Component} from "react";
import {FormattedMessage, FormattedNumber, defineMessages} from "react-intl";
import Head from "next/head";
import Layout from "../../components/intl/Layout";
import withIntl from "../../util/withIntl";

const {description} = defineMessages({
    description: {
        id: "description",
        defaultMessage: "An example app integrating React Intl with Next.js",
    },
});

class Index extends Component {
    static getInitialProps() {
    // Do something
    }

    render() {
        const {intl} = this.props;

        return (
            <Layout>
                <Head>
                    <meta name="description" content={intl.formatMessage(description)} />
                </Head>
                <p>
                    <FormattedMessage id="greeting" defaultMessage="Hello, Default!" />
                </p>
                <p>
                    <FormattedNumber value={1000} />
                </p>
            </Layout>
        );
    }
}

export default withIntl(Index);
