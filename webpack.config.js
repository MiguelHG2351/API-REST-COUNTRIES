//import ejs from "ejs-webpack-loader"
//import css from "css-loader"
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    
    entry: "./src/index.js",
    output: {
        path: __dirname + '/build',
        filename: "bundle.js",
        publicPath: "/API-REST-COUNTRIES/",
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
           test: /\.(png|svg|jpg|gif)$/,
           use: [
             'file-loader',
           ],
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
      port: 8080
    }


}

//module.exports = config;