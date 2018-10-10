/* eslint no-param-reassign: 0, global-require: 0, no-undef: 0, no-unused-vars: 0 */
const {CDN_URL} = process.env;
const withOffline = require("next-offline");
const {
    PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const path = require("path");
const fs = require("fs");
const requireHacker = require("require-hacker");

// styled jsx will fail without it
if (typeof require !== "undefined") {
    require.extensions[".less"] = () => {
    };
}


function setupRequireHacker() {
    const webjs = ".web.js";
    const webModules = ["antd-mobile", "rmc-picker"].map(m => path.join("node_modules", m));

    requireHacker.hook("js", (filename) => {
        if (filename.endsWith(webjs) || webModules.every(p => !filename.includes(p))) return;

        const webFilename = filename.replace(/\.js$/, webjs);
        if (!fs.existsSync(webFilename)) return;

        return fs.readFileSync(webFilename, {encoding: "utf8"});
    });

    requireHacker.hook("svg", filename => requireHacker.to_javascript_module_source(`#${path.parse(filename).name}`));
}

setupRequireHacker();

function moduleDir(m) {
    return path.dirname(require.resolve(`${m}/package.json`));
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
    webpack: (config, {dev}) => {
        // config.resolve.extensions = [".web.js", ".js", ".json"];

        config.module.rules.push(
            {
                test: /\.(svg)$/i,
                loader: "emit-file-loader",
                options: {
                    name: "dist/[path][name].[ext]",
                },
                include: [
                    moduleDir("antd-mobile"),
                    __dirname,
                ],
            },
            {
                test: /\.(svg)$/i,
                loader: "svg-sprite-loader",
                include: [
                    moduleDir("antd-mobile"),
                    __dirname,
                ],
            },
        );

        return config;
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
