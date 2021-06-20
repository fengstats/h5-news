// 导入共用文件
import './imports';

import init from './init';

; ((doc) => {
  init({
    url: '/',
    title: '新闻详情',
    showLeftIcon: true,
    showRightIcon: false
  }, doc);
})(document);