// 导入共用文件
import './imports';
// 导入头部组件
import Header from '../components/Header';
import Iframe from '../components/Iframe';
import Follow from '../components/Follow';

import { findUrlQuery } from '../libs/utils';

; ((doc) => {

  const oApp = doc.querySelector('#app');

  const currentNews = JSON.parse(localStorage.getItem('currentNews'));
  let followList = JSON.parse(localStorage.getItem('followList')) || [];

  console.log(currentNews);

  const init = () => {
    render();
    bindEvent();
  };

  function render() {
    const headerTpl = Header.tpl({
      url: findUrlQuery('path'),
      title: 'giegie详情',
      showLeftIcon: true,
      showRightIcon: false
    });

    const iframeTpl = Iframe.tpl(currentNews.url);
    const followTpl = createFollowTpl();

    oApp.innerHTML += (headerTpl + iframeTpl + followTpl);
  };

  // 创建Follow模板
  function createFollowTpl() {
    const isExist = followList.find((item) => item.uniquekey === currentNews.uniquekey);
    return Follow.tpl(isExist);
  };

  function bindEvent() {
    Follow.bindEvent(doFollow);
  };

  function doFollow(status) {
    // console.log(status);
    if (status) {
      // 需要收藏
      followList.push(currentNews);
    } else {
      // 需要取消收藏
      followList = followList.filter((item) => item.uniquekey !== currentNews.uniquekey);
    }
    localStorage.setItem('followList', JSON.stringify(followList));
  };

  init();

})(document);