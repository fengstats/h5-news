import './imports';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

import { NEWS_TYPE } from '../data';

// 导入初始化页面函数, 传入参数
import init from './init';

// console.log("index");

// import API from '../api';
// TODO: 测试请求是否有问题
// async function getNewsList() {
//   const data = await API.getNewsList('top', 10);
//   console.log(data);
// }
// getNewsList();

; ((doc) => {
  // 调用初始化函数
  // init({
  //   url: '/',
  //   title: '新闻头条',
  //   showLeftIcon: false,
  //   showRightIcon: true
  // }, doc);

  const oApp = doc.querySelector('#app');

  // 请求配置对象
  const config = {
    type: 'top'
  }

  // 初始化
  const init = () => {
    render();
    bindEvent();
  };

  // 渲染
  function render() {
    // 标题
    const headerTpl = Header.tpl({
      url: '/',
      title: 'giegie酱',
      showLeftIcon: false,
      showRightIcon: true
    });

    // 顶部导航
    const navbarTpl = NavBar.tpl(NEWS_TYPE);

    oApp.innerHTML += (headerTpl + navbarTpl);

  };

  // 绑定监听事件
  function bindEvent() {
    NavBar.bindClickEvent(setType);
  };

  // 设置类型
  function setType(type) {
    config.type = type;
    console.log('设置类型成功啦我的宝~', config.type);
  }

  init();

})(document);
