const webpack = require('webpack')
const path = require('path')
const paths = require('./config/paths')

module.exports = {
  entry: {
    react: ['react'],
    reactDOM: ['react-dom'],
  },
  output: {
    path: paths.appDll,
    filename: '[name].todo.dll.js',
    library: '_dll_[name]_library', // 存放动态链接库的全局变量名称，例如对应react来说就是——dll_react
    // 之所以在前面加上_dll_是为了防止全局变量冲突
  },
  plugins: [
    new webpack.DllPlugin({
      context: paths.appRoot,
      name: '_dll_[name]_library', //定义打包的公共文件对外暴露的函数名
      path: path.resolve(paths.appDll, '[name].todo.manifest.json'), // manifest.json 描述动态链接库包含了哪些内容
    }),
  ],
}
