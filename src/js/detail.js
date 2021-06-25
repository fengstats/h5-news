// 导入共用文件
import './imports';
// 导入头部组件
import Header from '../components/Header';
import Iframe from '../components/Iframe';

import { findUrlQuery } from '../libs/utils';

; ((doc) => {

  const oApp = doc.querySelector('#app');

  const currentNews = JSON.parse(localStorage.getItem('currentNews'));

  console.log(currentNews);

  const init = () => {
    render();
  };

  function render() {
    const headerTpl = Header.tpl({
      url: findUrlQuery('path'),
      title: 'giegie详情',
      showLeftIcon: true,
      showRightIcon: false
    });

    const iframeTpl = Iframe.tpl(currentNews.url);

    oApp.innerHTML += (headerTpl + iframeTpl);
  };

  init();

})(document);