/* eslint react/prefer-stateless-function: 0, no-use-before-define: 0, no-unused-vars: 0, no-shadow: 0 */

import React, {Component} from "react";
import Router from "next/router";
import {TabBar, Icon} from "antd-mobile";

export default class MenuBar extends Component {
    render() {
        const {
            pathname,
            children,
        } = this.props;

        return (
            <TabBar>
                {tabBarData.map(({
                    title, icon, selectedIcon, link, dot, component: Component,
                }) => (
                    <TabBar.Item
                        key={link}
                        title={title}
                        icon={<Icon type={icon} />}
                        selectedIcon={<Icon type={selectedIcon} />}
                        selected={pathname === link}
                        onPress={() => Router.push(link)}
                    >
                        {children}
                    </TabBar.Item>
                ))}
            </TabBar>
        );
    }
}

const tabBarData = [
    {
        title: "Home",
        icon: "up",
        selectedIcon: "up",
        link: "/mobile/home",
    },
    {
        title: "Icon",
        icon: "check-circle-o",
        selectedIcon: "check-circle",
        link: "/mobile/icon",
    },
    {
        title: "Trick",
        icon: "cross-circle-o",
        selectedIcon: "cross-circle",
        link: "/mobile/trick",
    },
];
