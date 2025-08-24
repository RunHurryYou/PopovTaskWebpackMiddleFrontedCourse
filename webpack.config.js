const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: "./index.js",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "build"),
        clean: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html")
    })],
};