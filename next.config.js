/* eslint no-param-reassign: 0, global-require: 0, no-undef: 0, no-unused-vars: 0 */
const {CDN_URL} = process.env;
const {
    PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD,
} = require("next/constants");

// styled jsx will fail without it
if (typeof require !== "undefined") {
    require.extensions[".less"] = () => {
    };
}

const nextConfig = {

    // devSwSrc: 'static/js/service-worker.js',
    poweredByHeader: false,
    // Try blank prefix as precache has localhost:9000 for service worker
    assetPrefix: CDN_URL ? `${CDN_URL}` : "",
    pageExtensions: ["jsx", "js", "bs.js"],
    lessLoaderOptions: {
        javascriptEnabled: true,
        // theme antd here
        modifyVars: {"@primary-color": "#DA4453"},
    }
};


//  apparently next-less, next-css, etc only need require duing dev/build
// https://github.com/zeit/next.js/issues/4248#issuecomment-386038283
// Obviously having css, less, and stylus at same time is overkill but there were cases where I needed them
// TODO: nib should only be loaded when withStylus is loaded
module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
        const withLess = require("@zeit/next-less");
        const withCSS = require("@zeit/next-css");

        return withLess(withCSS(nextConfig));
    }
    return nextConfig;
};
