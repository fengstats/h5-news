import './imports';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

// API
import API from '../api';

import { NEWS_TYPE } from '../data';

// 导入初始化页面函数, 传入参数
import init from './init';

; ((doc) => {
  // 请求配置对象
  const config = {
    type: 'top',
    count: 10
  };

  // 各新闻数据对象存储
  const newsData = {};

  // 获取绑定节点
  const oApp = doc.querySelector('#app');

  // 初始化
  const init = async () => {
    render();
    // 同步
    await setNewsList();
    // 等待数据获取渲染成功后, 再去绑定页面事件，以防dom未获取造成的错误出现
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
  };

  // 设置新闻列表的更新
  async function setNewsList() {
    const { type, count } = config;

    // 前提: 如果该类型新闻已经请求过了并且在数据存储中存在，那么直接使用即可，否则重新请求

    // 1.判断是否存在
    if (newsData[type]) {
      return;
    }

    newsData[type] = await API.getNewsList(type, count);
    console.log(newsData);
  };

  init();

})(document);
