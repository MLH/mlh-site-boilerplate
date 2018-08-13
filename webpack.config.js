"use strict";

const CleanWebpackPlugin = require('clean-webpack-plugin')
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebPackPlugin = require('html-webpack-plugin')
  , MiniCssExtractPlugin = require('mini-css-extract-plugin')
  , OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
  , Package = require('./package.json')
  , path = require('path')
  , project_config = require('./config.js')
  , SassLintPlugin = require('sass-lint-webpack')
  , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  , buildDestination = './dist'
  , versionJS = Package.webpack_bundle_version_js
  , versionCSS = Package.webpack_bundle_version_css;

function generateHtmlPlugins (templateDir) {
  const fs = require('fs');
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  return templateFiles
    .filter(item => item.includes('.hbs'))
    .map(item => {
      const parts = item.split('.');
        const name = parts[0]
          , extension = parts[1];
        return new HtmlWebPackPlugin({
          template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
          filename: `../${name}.html`,
          mobile: true,
          ...project_config
        })
    })
}

module.exports = (env, argv) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, buildDestination),
    filename: `mlh.v${versionJS}.min.js`
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
          "sass-loader",
        ]
      },
      {
        test: /.js/,
        enforce: 'pre',
        exclude: [/node_modules/, path.resolve(__dirname, "src/js/lib"),path.resolve(__dirname, "config.js")],
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
    new SassLintPlugin(),
    new CleanWebpackPlugin(buildDestination),
    new MiniCssExtractPlugin({
      filename: `mlh.v${versionCSS}.min.css`,
      chunkFilename: "[id].min.css"
    }),
    new BrowserSyncPlugin({
      open: false,
      host: 'localhost',
      port: 8080,
      server: { baseDir: ['.']}
    })
  ].concat(generateHtmlPlugins('./src')),
});
