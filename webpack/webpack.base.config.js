const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ],
        // exclude: /node_modules/
      }, 
      
      {oneOf: [
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader:'css-loader', 
              options: {
                sourceMap:true,
                modules: true,
              }
            },
            {
              loader:'postcss-loader',
            },
          {
              "loader": 'less-loader',
              'options': {
                javascriptEnabled: true
              }
            }
          ],
          exclude: /node_modules/
        }, 
        {
          test: /\.module\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          {
              "loader": 'less-loader',
              'options': {
                modules:true,
                javascriptEnabled: true
              }
            }
          ],
          exclude: /node_modules/
        }, 
      ]
    },
      {
        test: /\.[(png)|(obj)|(json)]$/,
        loader: "file-loader"
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "../public/index.html"),
      minify: {
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
   
  ],
  resolve: {
    alias:{      
      "@":path.resolve(__dirname,'src/*'),
  },
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  
}

