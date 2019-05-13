/* eslint react/prefer-stateless-function: 0 */
import React, {Component} from "react";
import {LocaleProvider} from "antd-mobile";
import enUS from "antd-mobile/lib/locale-provider/en_US";
import Head from "next/head";
import MobileHead from "./MobileHead";


export default class Layout extends Component {
    render() {
        const {language, children} = this.props;
        const locale = language.substr(0, 2) === "en" ? enUS : undefined;

        return (
            <React.Fragment>
                <Head>
                    {MobileHead}
                </Head>
                <LocaleProvider locale={locale}>
                    {children}
                </LocaleProvider>
            </React.Fragment>

        );
    }
}
