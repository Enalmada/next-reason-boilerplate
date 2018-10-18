import * as Sentry from "@sentry/browser";
// import getConfig from "next/config";
import React from "react";

// Sentry is a big mess on next: https://github.com/zeit/next.js/issues/1852
if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.ENV || "development",
        release: "VERSION_PLACEHOLDER",
    });
}

/**
 * Send an error event to Sentry.
 *
 * Server-side:
 * Next.js captures SSR errors and never passes them to the Sentry
 * middleware. It does, however, render the _error.js component, so
 * we can manually fire Sentry events here.
 *
 * Client-side:
 * Unhandled client exceptions will always bubble up to the _error.js
 * component, so we can manually fire events here.
 */
const notifySentry = (err, req, statusCode) => {
    Sentry.configureScope((scope) => {
        if (!req) {
            scope.setTag("ssr", false);
        } else {
            scope.setTag("ssr", true);
            scope.setExtra("url", req.url);
            scope.setExtra("params", req.params);
            scope.setExtra("query", req.query);
            scope.setExtra("statusCode", statusCode);
            scope.setExtra("headers", req.headers);

            if (req.user) {
                scope.setUser({id: req.user.id, email: req.user.email});
            }
        }
    });

    Sentry.captureException(err);
};

export default class Error extends React.Component {
    static async getInitialProps({req, res, err}) {
        let statusCode;

        if (res) {
            ({statusCode} = res);
        } else if (err) {
            ({statusCode} = err);
        } else {
            statusCode = null;
        }

        notifySentry(err, req, statusCode);

        return {statusCode};
    }

    render() {
        const {statusCode} = this.props;
        return statusCode;
    }
}
