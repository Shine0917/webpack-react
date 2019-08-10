const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin 插件，作用是添加模版到编译完成后到dist到文件里面，用于生成html
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); //  用于直接复制公共的文件
const paths = require('./config/paths');

const REGEXP_SCRIPT = /\.(js|jsx)$/;
const REGEXP_TYPESCRIPT = /\.(ts|tsx)$/;

const REGEXP_IMAGE = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const cssRegex = /\.css$/;
const lessRegex = /\.less$/;

module.exports = {
  // entry: path.resolve(__dirname, "../src/index.tsx"),
  entry: [paths.appIndex],
  output: {
    path: paths.appDist,
    // path: path.resolve(__dirname, '../dist'),
    // publicPath: '/',
    publicPath: paths.PUBLIC_PATH,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash:8].js',

  },
  module: {
    strictExportPresence: true,

    rules: [
      {
        test: REGEXP_TYPESCRIPT,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: REGEXP_SCRIPT,
        enforce: "pre",
        include: paths.appSrc,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: { cache: true, quiet: true }
      // },
      }, {
        oneOf: [
          {test: REGEXP_IMAGE,
           use: [
             {
              loader:'url-loader',
              options: {
              limit: 8192,
              name: 'images/[name]-[hash:5].[ext]'
             }
           },{
             loader: "image-webpack-loader",
             options: {
               mozjpeg: { //压缩 jpeg的配置
                 progressive: true,
                 quality: 65
               },
               optipng: { // 使用imagemin-optipng压缩png，enable:false 为关闭
                 enable: false
                
               },
               pngquant:{ // 使用imagemin-pngquant 压缩pbg
                quality: '65-90',
                speed: 4
               },
               gifsicle: { // 压缩gif 的配置
                 interlaced: false
               },
               webp: { // 开启webp，会把jpg和png图片压缩为webp格式
                 quality: 75
               }
            
             }
           }

           ] 
          },

        ]
      },
      {
        test: REGEXP_SCRIPT,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      
      {
        test: cssRegex,
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
      "@": path.resolve(paths.appSrc)      
      // "@":path.resolve(__dirname,'src/*'),
  }, // 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询工作
  // 其他文件可以在编码时指定后缀，如 import('./index.css')
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
    // 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
  },
  
}

