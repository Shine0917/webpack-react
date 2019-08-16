const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const paths = require('./config/paths');
const proxyConfig = require('./config/proxy');

module.exports = merge(base,{
  mode: 'development',
  devtool: 'source-map', // 选择一种source map 格式来增强调试过程，不同的值会明显影响到构建（build）和重新构建（rebuild）速度
  devServer: {
    // contentBase: "./public",
    contentBase: paths.appDist, // 本地服务器加载的页面所在的目录
    clientLogLevel: "none",
    historyApiFallback: true,  //404页面会自动跳转到/页面
    publicPath: paths.PUBLIC_PATH, // 此路径下打包文件可在浏览器中访问
    overlay:{ // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
     warnings: true,
     errors: true
    },
    compress: true,  //开发服务器是否启动gzip等压缩
    port: 9000,
    useLocalIp: true, //允许浏览器用本地IP打开
    open: true,  //打开浏览器
    inline: true, //实时刷新
    hot: true,  //热加载
    host: "0.0.0.0", // 主机地址
    disableHostCheck: false, //为true时，绕过主机检查
    proxy: { ...proxyConfig }
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: path.resolve(__dirname, "../public/index.html"),
    //   minify: {
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true,
    //   },
    // }),
    new webpack.NamedChunksPlugin(), // 用于启动HMR时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot MOdule Replacement 的插件
  ],
  
  optimization: {
    // minimize: false,
    runtimeChunk: true,
  }
});



