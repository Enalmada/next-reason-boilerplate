import React, {Component} from "react";
import {
    WhiteSpace, List, Switch, Menu,
} from "antd-mobile";
import {withRouter} from "next/router";
import Layout from "../../../components/consumer/mobile/Layout";
import MenuBar from "../../../components/consumer/mobile/MenuBar";

class Trick extends Component {
    static getInitialProps({req}) {
        const language = req ? req.headers["accept-language"] : navigator.language;
        const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
        const android = /android/i.test(userAgent);
        const platform = android ? "android" : "ios";

        return {
            language,
            platform,
        };
    }

    componentWillMount() {
        this.menuData = [
            {
                label: "Menu 1",
                value: "1",
                children: [
                    {
                        label: "Submenu 1-1",
                        value: "11",
                    },
                    {
                        label: "Submenu 1-2",
                        value: "12",
                    },
                ],
            },
            {
                label: "Menu 2",
                value: "2",
                children: [
                    {
                        label: "Submenu 2-1",
                        value: "21",
                    },
                    {
                        label: "Submenu 2-2",
                        value: "22",
                    },
                    {
                        label: "Submenu 2-3",
                        value: "23",
                    },
                ],
            },
        ];

        this.setState({switchChecked: true});
    }

    render() {
        const {
            language,
            platform,
            router: {pathname},
        } = this.props;

        const {
            switchChecked,
        } = this.state;

        return (
            <Layout language={language}>
                <MenuBar
                    pathname={pathname}
                >
                    <WhiteSpace />
                    <List renderHeader={() => "Switch platform prop is required in SSR mode"}>
                        <List.Item
                            extra={
                                <Switch
                                    platform={platform}
                                    checked={switchChecked}
                                    onChange={val => this.setState({switchChecked: val})}
                                />
                            }
                        >
              Switch {platform}
                        </List.Item>
                    </List>
                    <List renderHeader={() => "Menu height prop is required in SSR mode"}>
                        <Menu
                            height={500}
                            data={this.menuData}
                        />
                    </List>
                </MenuBar>
            </Layout>
        );
    }
}

// https://github.com/zeit/next-codemod#url-to-withrouter
export default withRouter(Trick);
