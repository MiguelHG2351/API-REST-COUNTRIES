//import ejs from "ejs-webpack-loader"
//import css from "css-loader"
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    
    entry: "./src/index.js",
    output: {
        path: __dirname + '/build',
        filename: "index.bundle.js",
        publicPath: "/",
    },
      module: {
        rules: [
          {
              test: /\.ejs$/,
              use: [
                  {
                    loader: "ejs-webpack-loader",
                    options: {
                      data: {title: "New", someVar:"hello world"},
                      htmlmin: true
                    }
                  }
              ]
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
           test: /\.(png|svg|jpg|gif)$/i,
            loader: 'url-loader',
            options: {
              publicPath: 'icono'
            }
         },
        ],
      },

      plugins: [
        new HtmlWebpackPlugin({
            template: './views/index.ejs'
        })
    ],

    devServer: {
      contentBase:path.join(__dirname, 'build'),
      compress: true,
      port: 5000
    }


}

//module.exports = config;