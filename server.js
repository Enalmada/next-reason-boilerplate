/* eslint no-shadow: "off", "no-console":  off, no-unused-vars: 0, no-param-reassign: 0,
guard-for-in: 0, no-restricted-syntax: 0,  no-underscore-dangle: 0, global-require: 0, no-useless-escape: 0, no-cond-assign: 0 */

// dotenv needs to come before anything that reads local environment variables
// In a real app you would make this dev only and .env would be in .gitignore.
// It helps test production build on local machine with some sane env variable settings
// TODO: think of a good way to enable this local machine dev and local production build testing
// if(dev) {
const dotenv = require("dotenv");

dotenv.config();
// }
const onHeaders = require("on-headers");

// Performance Monitoring for Node.js Applications (small fee to enable)
// https://www.site24x7.com/node-js-monitoring.html
if (process.env.SITE247_NODE_API && process.env.SITE247_NODE_APPNAME && process.env.SITE247_NODE_PORT) {
    require("apminsight")({
        licenseKey: process.env.SITE247_NODE_LICENSEKEY,
        appName: process.env.SITE247_NODE_APPNAME,
        port: process.env.SITE247_NODE_PORT,
    });
}

const express = require("express");
const next = require("next");
const expressHealthcheck = require("express-healthcheck");
const Sentry = require("@sentry/node");
const fs = require("fs");
const cors = require("cors");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

const path = require("path");
const helmet = require("helmet");
const shrinkRay = require("shrink-ray-current");
const routes = require("./routes");

const env = process.env.ENV;

// https://github.com/expressjs/express/issues/2456

// VERSION_PLACEHOLDER swapped out during build
// Note this part here only catches errors from server.js
// Sentry is a big mess on next: https://github.com/zeit/next.js/issues/1852
if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: env || "development",
        release: "VERSION_PLACEHOLDER",
    });
}


const whitelist = ["http://localhost:3000"];
const corsOptions = {
    origin(origin, callback) {
        // undefined is ok for assets without origin I think
        if (origin === undefined || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

function linkFile(name) {
    let as = "script";
    if (name.endsWith(".css")) {
        as = "style";
    }
    return `<${name}>; as=${as}; rel=preload; crossorigin=anonymous`;
}

// Put the preload hints in head into response headers for proxy to turn into h2 push
// Link headers are turned into h2 server push by most proxy which improves time to interactive latency.
// Use Chrome lighthouse plugin to test
const renderAndLink = function renderAndCache(
    req,
    res,
    pagePath,
    queryParams,
) {
    app
        .renderToHTML(req, res, pagePath, queryParams)
        .then((html) => {
            onHeaders(res, () => {
                const matches = [];
                const myRegex = /<link rel="preload" href=\"([^\"]*_next[^"]*)"/gs;
                let match;
                while (match = myRegex.exec(html)) matches.push(match[1]);
                const newLinks = matches.map(m => linkFile(m)).join("; ");

                const existingLinks = res.getHeader("link");

                if (existingLinks) {
                    res.setHeader("link", `${existingLinks}, ${newLinks}`);
                } else {
                    res.setHeader("link", newLinks);
                }
            });

            res.send(html);
        })
        .catch((err) => {
            app.renderError(err, req, res, pagePath, queryParams);
        });
};

const routerHandler = routes.getRequestHandler(
    app,
    ({
        req, res, route, query,
    }) => {
        renderAndLink(req, res, route.page, query);
    },
);


const createServer = () => {
    const server = express();

    // Compressing all assets in dev slows things down.
    // Only use this in production if your assets are cdn cached and proxy doesn't do br natively
    if (!dev) {
        server.use(shrinkRay()); // br compression with automatic recompression
    }

    // It is important to have real cors value so service worker caches proper response code
    server.use(cors(corsOptions));


    // Basic best practice security settings
    server.use(helmet());
    server.use(helmet.dnsPrefetchControl({allow: true})); // Consumer privacy risk but I prefer improved performance
    server.use(helmet.hsts({includeSubDomains: false})); // Security risk but I use some insecure domains

    // UNCOMMENT WITH VALID DSN ADDED ABOVE
    // server.use(Sentry.Handlers.requestHandler());
    // The error handler must be before any other error middleware
    // Unfortunately Next error handler is in front blocking this but that is being looked into.
    // server.use(Sentry.Handlers.errorHandler());

    server.options("*", cors()); // include before other routes

    server.use("/health", expressHealthcheck());

    server.get("/favicon.ico", (req, res) => {
        app.serveStatic(req, res, path.resolve("./static/icons/favicon.ico"));
    });

    // Service worker file gets created by next-offline
    // If you test in production mode, remember to manually unregister the production service worker after
    server.get("/service-worker.js", (req, res) => {
        // Don't cache service worker is a best practice (otherwise clients wont get emergency bug fix)
        res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.set("Content-Type", "application/javascript");
        // prefix manifest precache links with cdn so they are not downloaded twice by the browser from different places
        // fix links with windows style slashes so windows can local test (todo: replace with normalize-paths)
        res.send(
            Buffer.from(fs.readFileSync("./.next/service-worker.js", "utf8").toString()
                .replace(new RegExp("\"url\": \"/_next", "g"), `"url": "${process.env.CDN_URL}/_next`)
                .replace(new RegExp("\"url\": \"static", "g"), `"url": "${process.env.CDN_URL}/static`)
                .replace(new RegExp("\\\\\\\\", "g"), "/")),
        );
    });


    const robotsOptions = {
        root: `${__dirname}/static/`,
        headers: {
            "Content-Type": "text/plain;charset=UTF-8",
        },
    };
    server.get("/robots.txt", (req, res) => {
        if (env === "production") {
            res.status(200).sendFile("robots.txt", robotsOptions);
        } else {
            res.status(200).sendFile("robots-dev.txt", robotsOptions);
        }
    });


    /*
    server.get("/", (req, res) => {
        // HTTP2 server push critical assets required for page to become user interactive
        // Currently necessary to do .pageLink for every page but I hope to automate this somehow in the middleware
        // Argument is relative to /pages directory
        //res.pageLink("index.js");
        handle(req, res);
    });
*/

    // This seems to need to be after manual routes
    server.use(routerHandler);

    server.get("*", (req, res) => {
        // TODO: figure out how to add "no-cache" to only text/html pages so we can put CloudFront CDN
        // in front of our entire domain. This would be useful in serverless for a few reasons:
        // redirect http -> https, enable the CloudFront WAF
        // if (!cachable) {
        // res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        // }
        handle(req, res);
    });

    // I forget what I was doing here.
    // Consult  https://github.com/skriems/next-material
    /*
    server.get('*', (req, res) => {

        if (process.env.LAMBDA) {
            let host = req.headers.host;
            let assetPrefix = 'https://' + host;
            if (host.indexOf('amazonaws.com') != -1) {
                // needs to match the stages defined in `serverless.yml`
                let stage = dev ? '/dev' : '/prod'
                assetPrefix += stage;
            }
            app.setAssetPrefix(assetPrefix);
        }
        handle(req, res)}
    );
    */
    return server;
};

const server = createServer();

if (!process.env.LAMBDA) {
    app.prepare()
        .then(() => {
            server.listen(port, (err) => {
                if (err) throw err;
                // eslint-disable-next-line
                console.log(`> Ready on http://localhost:${port}`);
            });
        });
}

exports.app = app;
exports.server = server;
