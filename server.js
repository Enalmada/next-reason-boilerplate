/* eslint no-shadow: "off", "no-console":  off, no-unused-vars: 0, no-param-reassign: 0,
guard-for-in: 0, no-restricted-syntax: 0,  no-underscore-dangle: 0, global-require: 0, import/no-dynamic-require: 0,
prefer-destructuring: 0, no-bitwise: 0,  prefer-rest-params: 0, no-unused-expressions: 0, func-names: 0
 */


const dev = process.env.NODE_ENV !== "production";
if (dev) {
    const dotenv = require("dotenv");
    dotenv.config();
}


const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({dev});
const handle = app.getRequestHandler();

const createServer = () => {
    const server = express();

    server.get("*", (req, res) => {
        handle(req, res);
    });

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
