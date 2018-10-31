/* eslint no-console: 0, react/no-danger: 0 */

import React, {Component} from "react";
import {
    Icon, NavBar, Pagination, Steps, WhiteSpace, WingBlank,
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
                    <NavBar
                        leftContent="back"
                        mode="light"
                        onLeftClick={() => console.log("onLeftClick")}
                        rightContent={[
                            <Icon key="0" type="search" style={{marginRight: "0.32rem"}}/>,
                            <Icon key="1" type="ellipsis"/>,
                        ]}
                    >
            NavBar
                    </NavBar>
                    <WhiteSpace/>
                    <Pagination total={5} current={0}/>
                    <WhiteSpace/>
                    <WingBlank>
                        <Steps current={1}>
                            <Steps.Step title="Finished" description="Most components has supported"/>
                            <Steps.Step title="In Progress" description="Switch Modal and Menu"/>
                            <Steps.Step title="Waiting" description="1.2.0"/>
                        </Steps>
                    </WingBlank>
                </MenuBar>
            </Layout>
        );
    }
}

// https://github.com/zeit/next-codemod#url-to-withrouter
export default withRouter(Home);
