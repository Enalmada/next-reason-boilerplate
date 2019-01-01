/* eslint react/no-unused-state:0, no-console:0, prefer-destructuring:0 */

import {Menu} from "antd";

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
                Navigation Two
            </Menu.Item>
        </Menu>
    </div>
);
export default Index;
