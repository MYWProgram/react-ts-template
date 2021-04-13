const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const SERVER_HOST = 'localhost';
const SERVER_PORT = 9527;
const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;
// * modules 缓存，开启后可加快二次编译速度。
const IS_OPEN_HARD_SOURCE = true;
// * bundle 分析，打包后的各模块体积大小。
const shouldOpenAnalyzer = true;

module.exports = {
  isDev,
  SERVER_HOST,
  SERVER_PORT,
  PROJECT_PATH,
  PROJECT_NAME,
  IS_OPEN_HARD_SOURCE,
  shouldOpenAnalyzer
};
