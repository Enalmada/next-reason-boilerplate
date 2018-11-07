/* eslint no-shadow: "off", "no-console":  off, no-unused-vars: 0, no-param-reassign: 0,
guard-for-in: 0, no-restricted-syntax: 0,  no-underscore-dangle: 0, global-require: 0, import/no-dynamic-require: 0,
prefer-destructuring: 0, no-bitwise: 0,  prefer-rest-params: 0, no-unused-expressions: 0, func-names: 0
 */

// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require("intl");

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

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
const tamper = require("tamper");

const {readFileSync} = require("fs");
const {basename} = require("path");
const accepts = require("accepts");
const glob = require("glob");
const express = require("express");
const next = require("next");
const expressHealthcheck = require("express-healthcheck");
const Sentry = require("@sentry/node");
const fs = require("fs");
const cors = require("cors");

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({dev});
const path = require("path");
const helmet = require("helmet");
const shrinkRay = require("shrink-ray-current");

const env = process.env.ENV;

const nextPreloadHeaders = require("next-preload-headers");
const routes = require("./routes");

const handle = app.getRequestHandler();

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
            callback(new Error(`Not allowed by CORS - origin:${origin}`));
        }
    },
};

/*
const buildId = !dev
    ? fs.readFileSync("./.next/BUILD_ID", "utf8").toString()
    : "";
*/

// Get the supported languages by looking for translations in the `lang/` dir.
const languages = glob.sync("./static/locale/*.json").map(f => basename(f, ".json"));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = (locale) => {
    const lang = locale.split("-")[0];
    if (!localeDataCache.has(lang)) {
        const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
        const localeDataScript = readFileSync(localeDataFile, "utf8");
        localeDataCache.set(lang, localeDataScript);
    }
    return localeDataCache.get(lang);
};

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = locale => require(`./static/locale/${locale}.json`);


// Put the preload hints in head into response headers for proxy to turn into h2 push
// Link headers are turned into h2 server push by most proxy which improves time to interactive latency.
// Use Chrome lighthouse plugin to test
const nextRoutesHandler = routes.getRequestHandler(app);

const reactIntlLocaleMessages = function (req, res, next) {
    const accept = accepts(req);
    const locale = accept.language(languages) || "en";
    req.locale = locale;
    req.localeDataScript = getLocaleDataScript(locale);
    req.messages = getMessages(locale);
    next();
};

const createServer = () => {
    const server = express();


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

    // TODO this is hack for _document.js loadCSS hack of empty script tag
    // Remove this when react supports dangerous
    // https://github.com/facebook/react/issues/12014
    server.use(tamper((req, res) => {
        // only want to modify html responses:
        if (!res.getHeader("Content-Type").startsWith("text/html")) {
            // continue as usual without performance impact
            return;
        }

        // Return a function in order to capture and modify the response body:
        return function (body) {
            // The function may either return a Promise or a string
            return body.replace("<script></script>", "");
        };
    }));

    server.use(nextPreloadHeaders);

    // Put language and messages for react intl
    server.use(reactIntlLocaleMessages);

    // This seems to need to be after manual routes
    server.use(nextRoutesHandler);

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
