const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除dist文件及下内容，因为每次编译完成后都有一个dist文件夹存放静态文件，所以需要清除上次的dist文件
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const config = require('./config/config');
const paths = require('./config/paths');
const {BundleAnalyzerPlugin}  = require('webpack-bundle-analyzer');

const { USE_DLL} = config;
const IS_ANALYSIS = process.argv.includes('--analysis');

module.exports = merge(base,{
  mode: "production",
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].todo.css',
      chunkFilename: 'css/[id].[contenthash].todo.css'
    }),
    new CleanWebpackPlugin([paths.appDist],{
      root: paths.appRoot, // 绝对路径。就是要根据这个root去找要删除的文件夹，默认是这个webpack配置文件所在
      verbose: true, //控制台打印日志
      dry: false, // 为false 是删除文件夹
      watch: true, // 在编译的时候删除担保文件就是在npm start 或者npm run dev, 等跑本地服务的时候，删除之前的打包文件
      exclude: USE_DLL ? ['dll']: [], //排除不删除的目录。主要用于避免删除公用的文件
    }),
    IS_ANALYSIS && new BundleAnalyzerPlugin(),

    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../public/'),
    //     to: path.resolve(__dirname, '../dist/')
    //   }
    // ]),
  ].filter(Boolean),
  
  optimization: {
    // webpack4 去掉了 CommonsChunkPlugin，取而代之为 optimization.splitChunks 和 optimization.runtimeChunk 这两个配置。
    // 只在 production 模式下开启，否则禁用的相关配置
    sideEffects: false, // 通过减少生成代码在性能上有积极的影响，优点：bundle体积优化，更少生成代码，缺点：算法消耗
    runtimeChunk: true,
    minimize: true, // 使用最小化工具来压缩输出的资源包，比如（optimization.minimizer默认使用uglify-js)，优点：减小bundle体积；缺点编译速度降低

    minimizer: [
      new TerserPlugin({
        cache: true, 
        parallel: true,  // improvement: multiple-process
        sourceMap: true,
        terserOptions:{
          ecma: undefined,
          parse:{},
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          mangle: true, //混淆命名
          ie8: false,
          safari10: true, // fix 10 11 bug
        }
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: 'cssnano',
        cssProcessorPluginOptions:{
          preset: [
            "advanced",
            {
              discardComments: {removeAll: true},
              autoprefix: true,
            }
          ]
        }
      })
    ],
    // optimization.minimizer属性是用来放入各种压缩js编程式套件。如TerserWebpackPlugin.而optimization.minimize属性就像是optimization.minimizer的开关
    // 总是开启的相关配置：
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
