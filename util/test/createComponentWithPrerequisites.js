// This file

// https://www.apollographql.com/docs/react/recipes/testing.html
// https://github.com/quentin-sommer/react-useragent/blob/master/tests/index-test.js
// https://github.com/react-component/menu/issues/232

import React from "react";
import {IntlProvider} from "react-intl";
import {UserAgentProvider} from "@quentin-sommer/react-useragent";
import Router from "next/router";
import {render} from "enzyme";

import {config, library as fontawesome} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const mockedRouter = {push: () => {}, prefetch: () => {}};
Router.router = mockedRouter;

config.autoAddCss = false;
fontawesome.add(fas);

const createComponentWithPrerequisites = (children, props = {locale: "en"}) => render(
    <UserAgentProvider ua="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0">
        <IntlProvider {...props}>
            {children}
        </IntlProvider>
    </UserAgentProvider>,
);

export default createComponentWithPrerequisites;
