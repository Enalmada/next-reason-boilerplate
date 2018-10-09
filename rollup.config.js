/* eslint import/no-unresolved: 0 */

// Unfortunately I couldn't get this to work completely.
// If you can figure it out, it would help the community.
// I believe it is failing due to circular dependency in next:
// Refer to this for more info: https://github.com/zeit/next.js/issues/5392

import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import json from "rollup-plugin-json";

const NODE_ENV = process.env.NODE_ENV || "development";
const outputFile = NODE_ENV === "production" ? "./lib/prod.js" : "./lib/dev.js";

export default {
    input: "./server.js",
    output: {
        file: outputFile,
        format: "cjs",
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
        }),
        json(),
        babel({
            exclude: ["node_modules/**"],
        }),
        resolve({
            preferBuiltins: true,
        }),
        commonjs(),
    ],
    external: ["webpack", "readable-stream", "glob", "source-list-map", "through2"],
};
