const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.base.config.js')
module.exports = merge(base,{
  
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,  //404页面会自动跳转到/页面
    compress: true,  //开发服务器是否启动gzip等压缩
    port: 9000,
    useLocalIp: true, //用本地IP
    open: true,  //打开浏览器
    inline: true, //实时刷新
    hot: true,  //热加载
    host: "0.0.0.0",
    disableHostCheck: false, //为true时，绕过主机检查
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
    
    new webpack.HotModuleReplacementPlugin()
  ],
  
  optimization: {
    minimize: false,
  }
});



