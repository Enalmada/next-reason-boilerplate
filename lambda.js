/* eslint no-console: 0, no-unused-vars: 0, no-undef: 0, import/no-unresolved: "off" */

// If you are interested in serverless, please refer to this: https://github.com/skriems/next-material
// WARNING: I have changed this from the next-material example as text/html shouldn't be binary
// I think I did that so that it would go through their compression
// Unfortunately this boilerplate has gone far over the 50m maximum size for lambda but you may choose to
// eliminate huge assets like ant design that cause most of the bloat.
// Hopefully someone will figure out how to do rollup with nextjs to produce reasonable size distributions eventually.

const serverless = require("serverless-http");
const {app, server} = require("./server");

const binaryMimeTypes = [
    "application/octet-stream",
    "binary/octet-stream",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/x-icon",
    "image/svg+xml",
    "application/font-woff2",
    "application/font-woff",
    "font/woff",
    "font/woff2",
];

exports.handler = (event, context, callback) => {
    app.prepare()
        .then(() => {
            // saves some money
            if (event.source === "serverless-plugin-warmup") {
                console.log("WarmUP - Lambda is warm!");
                return callback(null, "Lambda is warm!");
            }

            const handler = serverless(server, {
                binary: binaryMimeTypes,
            });
            return handler(event, context, callback);
        });
};
