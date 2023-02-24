//import ejs from "ejs-webpack-loader"
//import css from "css-loader"
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path')

module.exports = {
    
    entry: "./src/index.js",
    output: {
        path: __dirname + '/build',
        filename: "index.bundle.js",
        publicPath: "/API-REST-COUNTRIES",
    },
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },

      plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            publicPath: '/'
        }),
        new CopyPlugin({
          patterns: [
            { from: "./src/public", to: "./build" },
          ],
          options: {
            concurrency: 100,
          },
        }),
    ],
    mode: 'production'
}

//module.exports = config;