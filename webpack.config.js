//import ejs from "ejs-webpack-loader"
//import css from "css-loader"
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    
    entry: {
      main: {
        import: './src/index.js',
      }
    },
    output: {
        path: __dirname + '/build',
        filename: "[name].js",
        publicPath: '/API-REST-COUNTRIES',
    },
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
        ],
      },

      plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            publicPath: '/API-REST-COUNTRIES'
        }),
        new CopyPlugin({
          patterns: [
            { from: "./src/public/images", to: "./" },
          ],
          options: {
            concurrency: 100,
          },
        }),
    ],
    mode: 'production'
}

//module.exports = config;