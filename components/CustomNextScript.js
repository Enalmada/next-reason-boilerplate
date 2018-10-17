/* eslint no-underscore-dangle: 0, prefer-destructuring: 0, no-console: 0, max-len: 0, react/no-danger: 0 */
import htmlescape from "htmlescape";
import {NextScript} from "next/document";
import React from "react";

const Fragment = React.Fragment || function Fragment({children}) {
    return <div>{children}</div>;
};
function getPagePathname(page) {
    if (page === "/") {
        return "/index.js";
    }

    return `${page}.js`;
}

export default class CustomNextScript extends NextScript {
    getDynamicChunks() {
        const {dynamicImports, assetPrefix} = this.context._documentProps;
        return dynamicImports.map(bundle => <script
            async
            key={bundle.file}
            src={`${assetPrefix}/_next/${bundle.file}`}
            nonce={this.props.nonce}
            crossOrigin="anonymous"
        />);
    }

    getScripts() {
        const {assetPrefix, files} = this.context._documentProps;
        if (!files || files.length === 0) {
            return null;
        }

        return files.map((file) => {
            // Only render .js files here
            if (!/\.js$/.exec(file)) {
                return null;
            }

            return <script
                key={file}
                src={`${assetPrefix}/_next/${file}`}
                nonce={this.props.nonce}
                async
                crossOrigin="anonymous"
            />;
        });
    }

    static getInlineScriptSource(documentProps) {
        const {__NEXT_DATA__} = documentProps;
        return `__NEXT_DATA__ = ${htmlescape(__NEXT_DATA__)};__NEXT_LOADED_PAGES__=[];__NEXT_REGISTER_PAGE=function(r,f){__NEXT_LOADED_PAGES__.push([r, f])}`;
    }

    render() {
        const {
            staticMarkup, assetPrefix, devFiles, __NEXT_DATA__,
        } = this.context._documentProps;
        const {page, buildId} = __NEXT_DATA__;
        const pagePathname = getPagePathname(page);

        return <Fragment>
            {devFiles ? devFiles.map(file => <script key={file} src={`${assetPrefix}/_next/${file}`} nonce={this.props.nonce} crossOrigin="anonymous" />) : null}
            {staticMarkup ? null : <script nonce={this.props.nonce} dangerouslySetInnerHTML={{
                __html: NextScript.getInlineScriptSource(this.context._documentProps),
            }} crossOrigin="anonymous" />}
            {page !== "/_error" && <script async id={`__NEXT_PAGE__${page}`} src={`${assetPrefix}/_next/static/${buildId}/pages${pagePathname}`} nonce={this.props.nonce} crossOrigin="anonymous" />}
            <script async id="__NEXT_PAGE__/_app" src={`${assetPrefix}/_next/static/${buildId}/pages/_app.js`} nonce={this.props.nonce} crossOrigin="anonymous" />
            <script async id="__NEXT_PAGE__/_error" src={`${assetPrefix}/_next/static/${buildId}/pages/_error.js`} nonce={this.props.nonce} crossOrigin="anonymous" />
            {staticMarkup ? null : this.getDynamicChunks()}
            {staticMarkup ? null : this.getScripts()}
        </Fragment>;
    }
}
