const path = require("path");

// javascriptEnabled fixes some less issue
// https://stackoverflow.com/a/48043781/1502448
module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"],
                include: path.resolve(__dirname, "../")
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        javascriptEnabled: true
                    }
                }]
            }
        ]
    }
};
