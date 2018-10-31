/* eslint no-underscore-dangle: 0, prefer-destructuring: 0, no-console: 0, max-len: 0 */

// All link references need crossorigin attribute for service worker to cache them without being opaque
// https://github.com/zeit/next.js/pull/5150

import React from "react";
import {Head} from "next/document";

function getPagePathname(page) {
    if (page === "/") {
        return "/index.js";
    }

    return `${page}.js`;
}


export default class CustomHead extends Head {
    getCssLinks() {
        const {assetPrefix, files} = this.context._documentProps;
        if (!files || files.length === 0) {
            return null;
        }

        return files.map((file) => {
            // Only render .css files here
            if (!/\.css$/.exec(file)) {
                return null;
            }

            return <link
                key={file}
                nonce={this.props.nonce}
                rel="stylesheet"
                href={`${assetPrefix}/_next/${file}`}
                crossOrigin="anonymous"
            />;
        });
    }

    getPreloadDynamicChunks() {
        const {dynamicImports, assetPrefix} = this.context._documentProps;
        return dynamicImports.map(bundle => <link
            rel="preload"
            key={bundle.file}
            href={`${assetPrefix}/_next/${bundle.file}`}
            as="script"
            nonce={this.props.nonce}
            crossOrigin="anonymous"
        />);
    }

    getPreloadMainLinks() {
        const {assetPrefix, files} = this.context._documentProps;
        if (!files || files.length === 0) {
            return null;
        }

        return files.map((file) => {
            // Only render .js files here
            if (!/\.js$/.exec(file)) {
                return null;
            }

            return <link
                key={file}
                nonce={this.props.nonce}
                rel="preload"
                href={`${assetPrefix}/_next/${file}`}
                as="script"
                crossOrigin="anonymous"
            />;
        });
    }

    render() {
        const {
            head, styles, assetPrefix, __NEXT_DATA__,
        } = this.context._documentProps;
        const {page, buildId} = __NEXT_DATA__;
        const pagePathname = getPagePathname(page);

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

        /*
              return <head {...this.props}>
        {(head || []).map((headEntry, index) => React.cloneElement(headEntry, { key: headEntry.key || index }))}
        {page !== '/_error' && <link rel='preload' href={`${assetPrefix}/_next/static/${buildId}/pages${pagePathname}`} as='script' nonce={this.props.nonce} />}
        <link rel='preload' href={`${assetPrefix}/_next/static/${buildId}/pages/_app.js`} as='script' nonce={this.props.nonce} />
        <link rel='preload' href={`${assetPrefix}/_next/static/${buildId}/pages/_error.js`} as='script' nonce={this.props.nonce} />
        {this.getPreloadDynamicChunks()}
        {this.getPreloadMainLinks()}
        {children}
        {styles || null}
        <noscript id="insertion-point-jss"></noscript>
        {this.getCssLinks()}
      </head>
    }
         */

        /*
        return <head {...this.props}>
            {head}
            {page !== "/_error" && <link rel="preload" href={`${assetPrefix}/_next/static/${buildId}/pages${pagePathname}`} as="script" nonce={this.props.nonce} crossOrigin="anonymous" />}
            <link rel="preload" href={`${assetPrefix}/_next/static/${buildId}/pages/_app.js`} as="script" nonce={this.props.nonce} crossOrigin="anonymous" />
            <link rel="preload" href={`${assetPrefix}/_next/static/${buildId}/pages/_error.js`} as="script" nonce={this.props.nonce} crossOrigin="anonymous" />
            {this.getPreloadDynamicChunks()}
            {this.getPreloadMainLinks()}
            {styles || null}
            {children}
            <noscript id="insertion-point-jss" />
            {this.getCssLinks()}
        </head>;
        */

        return <head {...this.props}>
            {head}
            {page !== "/_error" && <link rel="preload" href={`${assetPrefix}/_next/static/${buildId}/pages${pagePathname}`} as="script" nonce={this.props.nonce} crossOrigin="anonymous" />}
            <link rel="preload" href={`${assetPrefix}/_next/static/${buildId}/pages/_app.js`} as="script" nonce={this.props.nonce} crossOrigin="anonymous" />
            <link rel="preload" href={`${assetPrefix}/_next/static/${buildId}/pages/_error.js`} as="script" nonce={this.props.nonce} crossOrigin="anonymous" />
            {this.getPreloadDynamicChunks()}
            {this.getPreloadMainLinks()}
            {this.getCssLinks()}
            {styles || null}
            {children}
        </head>;
    }
}
