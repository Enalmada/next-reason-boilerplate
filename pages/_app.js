/* eslint camelcase: "off", react/jsx-no-undef: 0,  no-unused-vars: 0, no-console: 0, no-underscore-dangle: 0 */
import App, {Container} from "next/app";
import React from "react";

class MyApp extends App {
    render() {
        const {
            Component, pageProps,
        } = this.props;

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default MyApp;
