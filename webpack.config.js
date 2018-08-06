"use strict";

const HtmlWebPackPlugin = require("html-webpack-plugin");
// const BrowserSync = require('browser-sync-webpack-plugin');

module.exports = {
  module: {
    //  loader configuration
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    })
  ]
};
