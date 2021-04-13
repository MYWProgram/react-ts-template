const { resolve } = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common.js');
const { PROJECT_PATH, shouldOpenAnalyzer } = require('../constants');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  plugins: [
    // * 打包前清理上一次的 dist 文件夹。
    new CleanWebpackPlugin(),
    new PurgeCSSPlugin({
      // * glob 是用来查找文件路径的，我们同步找到 src 下面的后缀为 .tsx 、 .(sc|c|le)ss 的文件路径并以数组形式返给 paths ，然后该插件就会去解析每一个路径对应的文件，将无用样式去除。
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,css}`, { nodir: true }),
      whitelist: ['html', 'body']
    }),
    // * 添加不会被去除的包注释。
    new webpack.BannerPlugin({
      raw: true,
      banner: '/** @preserve Powered by react-ts-template (https://github.com/MYWProgram/react-ts-template) */'
    }),
    // * 打包分析器。
    shouldOpenAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888
      })
  ].filter(Boolean)
});
