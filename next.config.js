/* eslint no-param-reassign: 0, global-require: 0, no-undef: 0, no-unused-vars: 0 */
const {CDN_URL} = process.env;
const withOffline = require("next-offline");
const {
    PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD,
} = require("next/constants");

// styled jsx will fail without it
if (typeof require !== "undefined") {
    require.extensions[".less"] = () => {
    };
}


const nextConfig = {
    poweredByHeader: false,
    assetPrefix: CDN_URL ? `${CDN_URL}` : "http://localhost:3000",
    pageExtensions: ["jsx", "js", "bs.js"],
    lessLoaderOptions: {
        javascriptEnabled: true,
        // theme antd here
        modifyVars: {"@primary-color": "#DA4453"},
    },
};


// Consider this for Less stuff - apparently next-less and next-css only need require duing dev/build
// https://github.com/zeit/next.js/issues/4248#issuecomment-386038283
module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
        const withLess = require("@zeit/next-less");
        const withCSS = require("@zeit/next-css");
        return withOffline(withLess(withCSS(nextConfig)));
    }
    return withOffline(nextConfig);
};
