const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
module.exports = merge(base,{
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public/'),
        to: path.resolve(__dirname, '../dist/')
      }
    ]),
  ],
  
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true, 
        parallel: true, 
        sourceMap: true
      })
    ],
    splitChunks: { // 查找在 chunks 之间哪些 module 被共享，同时将他们拆分到独立的 chunks 中，目的是减少重复或者从 application modules 中分离 vendor modules。优点：更少生成代码，更好的缓存，更少的下载请求；缺点：算法消耗，额外的请求；
      automaticNameDelimiter: '~', // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
      chunks: 'all', // 匹配的块的类型：initial(初始块)、async(按需加载的异步块)、all(所有块)
      minSize: 40000, // 分离前的最小文件大小，单位-字节
      cacheGroups: { // 缓存组，存放分离代码块的规则对象。可以继承/覆盖上面 splitChunks 中所有的参数值
        vendor: { 
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: 10, // 优先级。当需要优先匹配缓存组的规则时为正数，当需要优先匹配默认设置时为负数
          enforce: true,
        }
      }
    }
  }
}
)
