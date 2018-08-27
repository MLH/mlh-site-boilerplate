"use strict";

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
  , CopyWebpackPlugin = require('copy-webpack-plugin')
  , ImageminPlugin = require('imagemin-webpack-plugin').default
  , HtmlWebPackPlugin = require('html-webpack-plugin')
  , MiniCssExtractPlugin = require('mini-css-extract-plugin')
  , OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
  , Package = require('./package.json')
  , path = require('path')
  , project_config = require('./config.js')
  , SassLintPlugin = require('sass-lint-webpack')
  , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  , buildDestination = './dist'
  , port = 8080
  , versionJS = Package.webpack_bundle_version_js
  , versionCSS = Package.webpack_bundle_version_css;

function generateHtmlPlugins (templateDir, mode) {
  const fs = require('fs')
      , dataFiles = fs.readdirSync(path.resolve(__dirname, './src/data'))
      , templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  mode === 'development' ? project_config.site.baseUrl = `http://localhost:${port}/` : false

  var data = {}
  dataFiles.filter( item => item.includes('.json'))
    .map( fileName => data[fileName.replace('.json','')] = require(__dirname + '/src/data/' + fileName))

  return templateFiles
    .filter(item => item.includes('.hbs'))
    .map(item => {
      const parts = item.split('.')
        , name = parts[0]
        , extension = parts[1];
        
      return new HtmlWebPackPlugin({
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        filename: `${name}.html`,
        pageName: name,
        ...data,
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
        loader: "handlebars-loader?interpolate=require",
        options: {
          helperDirs: path.join(__dirname, 'src/js/handlebarsHelpers'),
          precompileOptions: {
            knownHelpersOnly: false,
          },
        },
      },
      {
        test: /\.(png|jpe?g|svg|ico|gif)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10 * 1024
            }
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
  resolve: {
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js'
    }
  },
  plugins: [
    new SassLintPlugin(),
    new CleanWebpackPlugin(buildDestination),
    new MiniCssExtractPlugin({
      filename: `mlh.v${versionCSS}.min.css`,
      chunkFilename: "[id].min.css"
    }),
    new CopyWebpackPlugin([{from:'src/img',to:'img'}]),
    new ImageminPlugin({ test: /\.(png|jpe?g|svg|ico|gif)/i }),
    new BrowserSyncPlugin({
      open: false,
      host: 'localhost',
      port: port,
      server: { baseDir: ['./dist']}
    })
  ].concat(generateHtmlPlugins('./src', argv.mode)),
});
