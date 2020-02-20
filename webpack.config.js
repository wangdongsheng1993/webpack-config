const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let indexCss = new ExtractTextWebpackPlugin('index.css')
let indexSass = new ExtractTextWebpackPlugin('index.sass')

module.exports = {
  mode: 'development',
  entry: {
    main: ["@babel/polyfill",path.resolve(__dirname, './src/main.js')],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename:'index.html',
      // chunks: ['main']
    }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[hash:8].css',
    // }),
    indexCss,
    indexSass
  ],
  module:{
    rules:[
      // {
      //   test:/\.css$/,
      //   use:[style-loader,'css-loader','postcss-loader'] // 从右向左解析原则
      // },
      // {
      //   test:/\.scss$/,
      //   use:[style-loader,'css-loader','postcss-loader','sass-loader'] // 从右向左解析原则
      // },
      // {
      //   test:/\.css$/,
      //   use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader'] // 从右向左解析原则
      // },
      // {
      //   test:/\.scss$/,
      //   use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader'] // 从右向左解析原则
      // },
      {
        test:/\.css$/,
        use:indexCss.extract({use:['css-loader','postcss-loader']}) // 从右向左解析原则
      },
      {
        test:/\.scss$/,
        use:indexSass.extract({use:['css-loader','postcss-loader','sass-loader']}) // 从右向左解析原则
      },
      {
        test:/\.js$/,
        use:
          {
            loader: 'babel-loader',
            options: {
              presets:['@babel/preset-env']
            }
          },
          exclude: /node_modules/
      },
      {
        test:/\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  }
}