"use strict";

const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var PACKAGE = require('./package.json');
var version = PACKAGE.version;
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const BrowserSync = require('browser-sync-webpack-plugin');

let pathsToClean = [
  'dist',
]

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `index_bundle.v${version}.min.js`
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new HtmlWebPackPlugin({
      template: "./src/index.hbs",
      mobile: true,
      custom: {
        title: "INSERT_SITE_NAME",
        fallbackTitle: "MLH",
        description: "INSERT_SITE_DESCRIPTION",
        fallbackDescription: "default"
      },
      tracking: {
        google_analytics_id: '', // Example: UA-43729070-14
        twitter_id: '', // Example: "nv0ih"
        facebook_id: '', // Example: 261635320842380
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].min.css",
      chunkFilename: "[id].min.css"
    }),
  ],
  module: {
    //  loader configuration
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.(png|jpe?g|svg|ico)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 8000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.exec\.js$/,
        use: [ 'script-loader' ]
      }
    ]
  }
};
