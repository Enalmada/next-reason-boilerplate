// @flow

import React from "react";
import AppWrapper from "./App";
import Header from "./Header.bs";

// import "../../assets/styles.less";

/*
type Props = {
    children: React.Node
}
*/

const SamplePage = ({children}) => (
    <AppWrapper>
        <Header/>
        {children}
    </AppWrapper>
);

export default SamplePage;
