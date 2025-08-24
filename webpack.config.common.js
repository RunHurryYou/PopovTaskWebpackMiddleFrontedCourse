const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: "./index.js",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "build"),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public/assets"),
                    to: path.resolve(__dirname, "build/assets")
                }
            ]
        })
    ],
};