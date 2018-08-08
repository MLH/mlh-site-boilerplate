"use strict";

const CleanWebpackPlugin  = require('clean-webpack-plugin'),
  HtmlWebPackPlugin       = require('html-webpack-plugin'),
  MiniCssExtractPlugin    = require('mini-css-extract-plugin'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  Package                 = require('./package.json'),
  path                    = require('path'),
  project_config          = require('./config.js'),
  UglifyJsPlugin          = require('uglifyjs-webpack-plugin');

const versionJS  = Package.webpack_bundle_version_js,
      versionCSS = Package.webpack_bundle_version_css;

// project_config overwrites default_config, edit project_config to customize the values below or add new fields
const default_config = {
  site: {
    title: "MLH",
    description: "The official collegiate hackathon league.",
    baseurl: "/",
    favicon_url: "img/favicon.ico"
  }
}

const site_config = {...default_config, ...project_config};

function generateHtmlPlugins (templateDir) {
  const fs = require('fs');
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))

  return templateFiles
    .filter(item => item.includes('.hbs'))
    .map(item => {
      const parts = item.split('.')
        const name = parts[0]
        const extension = parts[1]
        return new HtmlWebPackPlugin({
          template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
          filename: `${name}.html`,
          mobile: true,
          ...site_config
        })
    })
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `index_bundle.v${versionJS}.min.js`
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.(png|jpe?g|svg|ico|gif)/i,
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
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: `[name].v${versionCSS}.min.css`,
      chunkFilename: "[id].min.css"
    }),
  ].concat(generateHtmlPlugins('./src')),
  devServer: { open: false }
};
