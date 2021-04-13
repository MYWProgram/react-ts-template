import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// * 热更新第三步：开启后可局部刷新。
if (module && module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.querySelector('#root'));
