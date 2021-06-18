import './imports';

import init from './init';

// 导入头部组件

; ((doc) => {
  // 调用初始化函数
  init({
    url: '/',
    title: '收藏giegie',
    showLeftIcon: true,
    showRightIcon: false
  }, doc);
})(document);