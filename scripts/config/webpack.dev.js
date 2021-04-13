const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { SERVER_HOST, SERVER_PORT } = require('../constants');
const proxySetting = require('../../src/setProxy.js');

module.exports = merge(common, {
  mode: 'development',
  // * dev 下代码错误报告。
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    // * 终端仅打印 error.
    stats: 'errors-only',
    // * 日志等级。
    clientLogLevel: 'silent',
    // * gzip 压缩。
    compress: true,
    open: true,
    // * 热更新第一步。
    hot: true,
    proxy: { ...proxySetting }
  },
  plugins: [
    // * 热更新第二步：引入插件，此时会全量更新；需要局部更新要在入口文件进一步设置。
    new webpack.HotModuleReplacementPlugin()
  ]
});
