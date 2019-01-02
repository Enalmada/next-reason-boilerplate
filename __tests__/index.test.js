/* eslint-env jest */

import {shallow} from "enzyme";
import React from "react";
import {MockedProvider} from "react-apollo/test-utils";
import createComponentWithPrerequisites from "../util/test/createComponentWithPrerequisites";
import App from "../pages/index.bs";

// The component AND the query need to be exported
const mocks = [];


describe("With Enzyme", () => {
    it("App shows \"Hello world!\"", () => {
        const app = shallow(<App/>).dive();

        expect(app.find("h1").text()).toEqual("nextjs reason-react boilerplate demonstrating some concepts");
    });
});

describe("With Snapshot Testing", () => {
    it("App shows \"Hello world!\"", () => {
        const component = createComponentWithPrerequisites(<MockedProvider mocks={mocks} addTypename={false}>
            <App/></MockedProvider>);
        expect(component.text()).toMatchSnapshot();
    });
});
