/* eslint no-underscore-dangle: 0, prefer-destructuring: 0, no-console: 0, max-len: 0 */

import React from "react";
import {Head} from "next/document";

const getPagePathname = (pathname) => {
    if (pathname === "/") {
        return "/index.js";
    }

    return `${pathname}.js`;
};

export default class CustomHead extends Head {
    render() {
        const {
            head, styles, assetPrefix, __NEXT_DATA__,
        } = this.context._documentProps;
        const {page, pathname, buildId} = __NEXT_DATA__;
        const pagePathname = getPagePathname(pathname);

        let children = this.props.children;
        // show a warning if Head contains <title> (only in development)
        if (process.env.NODE_ENV !== "production") {
            children = React.Children.map(children, (child) => {
                if (child && child.type === "title") {
                    console.warn("Warning: <title> should not be used in _document.js's <Head>. https://err.sh/next.js/no-document-title");
                }
                return child;
            });
        }

        return <head {...this.props}>
            {(head || []).map((headEntry, index) => React.cloneElement(headEntry, {key: headEntry.key || index}))}
            {page !== "/_error" && <link rel="preload" href={`${assetPrefix}/_next/static/${buildId}/pages${pagePathname}`} as="script" nonce={this.props.nonce} />}
            <link rel="preload" href={`${assetPrefix}/_next/static/${buildId}/pages/_app.js`} as="script" nonce={this.props.nonce} />
            <link rel="preload" href={`${assetPrefix}/_next/static/${buildId}/pages/_error.js`} as="script" nonce={this.props.nonce} />
            {this.getPreloadDynamicChunks()}
            {this.getPreloadMainLinks()}
            {children}
            {styles || null}
            <noscript id="insertion-point-jss" />
            {this.getCssLinks()}
        </head>;
    }
}
