const webpack = require('webpack');
const path = require('path');
const paths = require('./config/paths');

module.exports ={
  entry: {
    react:['react'],
    reactDOM: ['react-dom'],
  },
  output: {
    path: paths.appDll,
    filename: '[name].todo.dll.js',
    library: '_dll_[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      context: paths.appRoot,
      name: '_dll_[name]_library', //定义打包的公共文件对外暴露的函数名
      path: path.resolve(paths.appDll, '[name].todo.manifest.json')  // manifest.json 描述动态链接库包含了哪些内容
    })
  ]
}