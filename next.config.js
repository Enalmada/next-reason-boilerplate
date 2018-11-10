/* eslint no-param-reassign: 0, global-require: 0, no-undef: 0, no-unused-vars: 0 */
const {CDN_URL} = process.env;
const withOffline = require("next-offline");
const {
    PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const path = require("path");
const fs = require("fs");
const requireHacker = require("require-hacker");
const nib = require("nib"); // TODO: this should be only used during dev/build

const {ANALYZE} = process.env;

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
    purgeCss: {
        whitelist: ["ant-layout"],
        whitelistPatterns: [/^ant-/, /^fade-/, /^move-/, /^slide-/, /^zoom-/, /^svg-/, /^fa-/],
        whitelistPatternsChildren: [/^ant-/, /^fade-/, /^move-/, /^slide-/, /^zoom-/, /^svg-/, /^fa-/],
    },
    stylusLoaderOptions: {
        use: [nib()],
    },
    // devSwSrc: 'static/js/service-worker.js',
    poweredByHeader: false,
    // Try blank prefix as precache has localhost:9000 for service worker
    assetPrefix: CDN_URL ? `${CDN_URL}` : "",
    pageExtensions: ["jsx", "js", "bs.js"],
    lessLoaderOptions: {
        javascriptEnabled: true,
        // theme antd here
        modifyVars: {"@primary-color": "#DA4453"},
    },
    workboxOpts: {
        runtimeCaching: [
            {
                urlPattern: /^https:\/\/fonts\.googleapis\.com/,
                handler: "cacheFirst",
                options: {
                    cacheName: "google-fonts-stylesheets",
                    expiration: {maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30},
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
            {urlPattern: /^https?.*/, handler: "networkFirst"},
        ],
        // Not sure adding display swap is actually working (i see fetch for plain still after)
        // importScripts: ['static/js/service-worker-extras.js'],
        skipWaiting: true,
        clientsClaim: true,
    },
    webpack: (config, {dev}) => {
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

        if (ANALYZE) {
            const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

            config.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: "server",
                analyzerPort: isServer ? 8888 : 8889,
                openAnalyzer: true,
            }));
        }

        // Webpack 4 doesn't minify out of the box
        // https://spectrum.chat/?t=9f9f43b8-ec8b-45e5-a8e3-5b57a62e9e67
        if (config.mode === "production" && Array.isArray(config.optimization.minimizer)) {
            const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
            config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
        }

        return config;
    },
};


//  apparently next-less, next-css, etc only need require duing dev/build
// https://github.com/zeit/next.js/issues/4248#issuecomment-386038283
// Obviously having css, less, and stylus at same time is overkill but there were cases where I needed them
// TODO: nib should only be loaded when withStylus is loaded
module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
        const withLess = require("@zeit/next-less");
        const withCSS = require("@zeit/next-css");
        const withStylus = require("@zeit/next-stylus");
        const withPurgeCss = require("next-purgecss");

        return withOffline(withStylus(withLess(withCSS(withPurgeCss(nextConfig)))));
    }
    return withOffline(nextConfig);
};
