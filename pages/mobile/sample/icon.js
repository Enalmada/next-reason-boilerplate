/* eslint global-require: 0 */

import React, {Component} from "react";
import {
    WhiteSpace, WingBlank, Card, Icon,
} from "antd-mobile";
import {withRouter} from "next/router";
import Layout from "../../../components/consumer/mobile/Layout";
import MenuBar from "../../../components/consumer/mobile/MenuBar";

class Home extends Component {
    static getInitialProps({req}) {
        const language = req ? req.headers["accept-language"] : navigator.language;

        return {
            language,
        };
    }

    render() {
        const {
            language,
            router: {pathname},
        } = this.props;

        return (
            <Layout language={language}>
                <MenuBar
                    pathname={pathname}
                >
                    <WingBlank>
                        <WhiteSpace />
                        <Card>
                            <Card.Header
                                extra="Internal svg"
                                thumb={<Icon type="check" />}
                            />
                            <Card.Body>
                                <code>
                                    {"<Icon type='check' />"}
                                </code>
                            </Card.Body>
                        </Card>
                        <WhiteSpace />


                        <style jsx>{`
              code {
                color: gray;
              }
            `}</style>
                    </WingBlank>
                </MenuBar>
            </Layout>
        );
    }
}

// https://github.com/zeit/next-codemod#url-to-withrouter
export default withRouter(Home);
