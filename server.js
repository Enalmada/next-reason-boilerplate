/* eslint no-shadow: "off", "no-console":  off, no-unused-vars: 0, no-param-reassign: 0,
guard-for-in: 0, no-restricted-syntax: 0,  no-underscore-dangle: 0, global-require: 0 */
const dev = process.env.NODE_ENV !== "production";
if (dev) {
    const dotenv = require("dotenv");
    dotenv.config();
}

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
const app = next({dev});
const path = require("path");
const parseURL = require("url").parse;
const helmet = require("helmet");
const shrinkRay = require("shrink-ray-current");

const env = process.env.ENV;

const nextPreloadHeaders = require("next-preload-headers");
const i18nextMiddleware = require("i18next-express-middleware");
const Backend = require("i18next-node-fs-backend");
const routes = require("./routes");
const config = require("./i18next/config");
const i18n = require("./i18next/i18n");
const getAllNamespaces = require("./i18next/lib/getAllNamespaces");

const handle = app.getRequestHandler();

const {CDN_URL} = process.env;
const cdnPrefix = CDN_URL ? `${CDN_URL}` : "";

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
        if (origin === undefined || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};


const buildId = !dev
    ? fs.readFileSync("./.next/BUILD_ID", "utf8").toString()
    : "";

// Put the preload hints in head into response headers for proxy to turn into h2 push
// Link headers are turned into h2 server push by most proxy which improves time to interactive latency.
// Use Chrome lighthouse plugin to test
const nextPreloadHeadersRouterHandler = routes.getRequestHandler(app, ({
    req, res, route, query,
}) => {
    nextPreloadHeaders(app, req, res, route.page, query);
});

const {
    localesPath, allLanguages, defaultLanguage, enableSubpaths,
} = config.translation;

const serverSideOptions = {
    fallbackLng: defaultLanguage,
    preload: allLanguages, // preload all langages
    ns: getAllNamespaces(`${localesPath}${defaultLanguage}`), // need to preload all the namespaces
    backend: {
        loadPath: path.join(__dirname, "/static/locales/{{lng}}/{{ns}}.json"),
        addPath: path.join(__dirname, "/static/locales/{{lng}}/{{ns}}.missing.json"),
    },
};

const createServer = () => {
    const server = express();

    // enable middleware for i18next
    server.use(i18nextMiddleware.handle(i18n));
    // serve locales for client
    server.use("/locales", express.static(path.join(__dirname, "/locales")));

    // missing keys
    server.post("/locales/add/:lng/:ns", i18nextMiddleware.missingKeyHandler(i18n));


    // Compressing all assets in dev slows things down.
    // Only use this in production if your assets are cdn cached and proxy doesn't do br natively
    if (!dev) {
        server.use(shrinkRay());
    }

    // It is important to have real cors value so service worker caches proper response code
    server.use(cors(corsOptions));

    server.use(helmet()); // Basic best practice security settings
    server.use(helmet.dnsPrefetchControl({allow: true})); // Performance desired in this case
    server.use(helmet.hsts({includeSubDomains: false})); // Lets not force our summary domain to https

    server.use(Sentry.Handlers.requestHandler());

    // The error handler must be before any other error middleware
    // Unfortunately Next error handler is in front blocking this but that is being looked into.
    server.use(Sentry.Handlers.errorHandler());

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
        /*
        res.send(
            Buffer.from(fs.readFileSync("./.next/service-worker.js", "utf8").toString()
                .replace(new RegExp("\"url\": \"/_next", "g"), `"url": "${cdnPrefix}/_next`)
                .replace(new RegExp("\"url\": \"static", "g"), `"url": "${cdnPrefix}/static`)
                .replace(new RegExp("\\\\\\\\", "g"), "/")),
        );
        */
        app.serveStatic(req, res, path.resolve("./.next/service-worker.js"));
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


    // This seems to need to be after manual routes
    server.use(nextPreloadHeadersRouterHandler);

    server.get("*", (req, res) => {
        // TODO: figure out how to add "no-cache" to only text/html pages so we can put CloudFront CDN
        // in front of our entire domain. This would be useful in serverless for a few reasons:
        // redirect http -> https, enable the CloudFront WAF
        // if (!cachable) {
        // res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        // }
        handle(req, res);
    });


    return server;
};

const server = createServer();

if (!process.env.LAMBDA) {
// init i18next with serverside settings
    // using i18next-express-middleware
    i18n
        .use(Backend)
        .use(i18nextMiddleware.LanguageDetector)
        .init(serverSideOptions, () => {
            app.prepare()
                .then(() => {
                    server.listen(port, (err) => {
                        if (err) throw err;
                        // eslint-disable-next-line
                        console.log(`> Ready on http://localhost:${port}`);
                    });
                });
        });
}

exports.app = app;
exports.server = server;
