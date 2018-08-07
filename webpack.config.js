"use strict";

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PACKAGE = require('./package.json')
const version = PACKAGE.webpack_bundle_version
const CleanWebpackPlugin = require('clean-webpack-plugin')
const project_config = require('./config.js')

const fs = require('fs')

const pathsToClean = [
  'dist',
]

function generateHtmlPlugins (templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  
  // console.log(templateFiles)
  return templateFiles
    .filter(item => item.includes('.hbs'))
    .map(item => {
      // Split names and extension
      const parts = item.split('.')
        const name = parts[0]
        const extension = parts[1]
        return new HtmlWebPackPlugin({
          template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
          filename: `${name}.html`,
          mobile: true,
          site: {
            title: project_config.title,
            description: project_config.desctiption,
            baseurl: project_config.description,
            url: project_config.url,
            custom_class: project_config.custom_class
          },
          tracking: {
            google_analytics_id: project_config.google_analytics_id,
            twitter_id: project_config.twitter_id,
            facebook_id: project_config.facebook_id
          }
        })
    })
}

const htmlPlugins = generateHtmlPlugins('./src')

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
  module: {
    //  loader configuration
    rules: [
      {
        test: /\.hb    "expose-loader": "^0.7.5",s$/,
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
        test: /.js/,
        enforce: 'pre',
        exclude: [/node_modules/, path.resolve(__dirname, "src/js/lib"),],
        use: [
          {
            loader: `eslint-loader`
          }
        ]
      },
      {
        test: /\.exec\.js$/,
        use: [ 'script-loader' ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new MiniCssExtractPlugin({
      filename: "[name].min.css",
      chunkFilename: "[id].min.css"
    }),
  ].concat(htmlPlugins),
  devServer: { open: false }
};
