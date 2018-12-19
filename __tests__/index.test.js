/* eslint-env jest */

import {shallow} from "enzyme";
import React from "react";
import {MockedProvider} from "react-apollo/test-utils";
import {config, library as fontawesome} from "@fortawesome/fontawesome-svg-core";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import createComponentWithIntl from "../util/test/createComponentWithIntl";
import App from "../pages/index.bs";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
fontawesome.add(faComments);


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
        const component = createComponentWithIntl(<MockedProvider mocks={mocks} addTypename={false}>
            <App/></MockedProvider>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
