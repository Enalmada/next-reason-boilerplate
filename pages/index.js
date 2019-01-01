/* eslint react/no-unused-state:0, no-console:0, prefer-destructuring:0 */

import React from "react";
import {Menu, Icon} from "antd";

const Index = () => (
    <div>
        <h1>Split Test Fail Example</h1>

        <Menu
            mode="horizontal"
        >
            <Menu.Item key="mail">
                    Navigation One
            </Menu.Item>
            <Menu.Item key="app">
                <Icon type="appstore" />Navigation Two
            </Menu.Item>
        </Menu>
    </div>
);

export default Index;
