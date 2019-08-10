import MiniCssExtractPlugin from 'mini-css-extract-plugin'; // 将css提取到单独到文件在，它为每个包含css的js文件创建一个css文件

const getStyleLoader = ({
  isProd,
  sourceMap = true,
  modules = false,
  useLess = false,
  modifyVars = {},
}) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : {
      loader: 'style-loader',
      options: { sourceMap },
    },
    {
      loader: 'css-loader',
      options: {
        modules,
        sourceMap,
        localIdentName: "[path][name]__[local]--[hash:base64:5]",
        importLoaders: useLess ? 2 :1,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap,
      }
    },
    useLess && {
      loader: 'less-loader',
      options: {
        javasxriptEnabled: true,
        sourceMap,
        modifyVars
      }
    }
  ].filter(Boolean);
}

export default getStyleLoader;
