/* eslint-env jest */

import {shallow} from "enzyme";
import React from "react";
import {MockedProvider} from "react-apollo/test-utils";
import createComponentWithPrerequisites from "../util/test/createComponentWithPrerequisites";
import App from "../pages/index";

// The component AND the query need to be exported
const mocks = [];

/*
describe("With Enzyme", () => {
    it("App shows \"Split Test Fail Example\"", () => {
        const app = shallow(<App/>);

        expect(app.find("h1").text()).toEqual("Split Test Fail Example");
    });
});
*/


describe("With Snapshot Testing", () => {
    it("App shows \"Split Test Fail Example\"", () => {
        const component = createComponentWithPrerequisites(<MockedProvider mocks={mocks} addTypename={false}>
            <App/></MockedProvider>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
