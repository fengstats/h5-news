import './imports';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';
import PageLoading from '../components/PageLoading';

// API
import API from '../api';

import { NEWS_TYPE } from '../data';

// 导入初始化页面函数, 传入参数
import init from './init';

; ((doc) => {
  // 请求配置对象
  const config = {
    type: 'top',
    count: 10,
    pageNum: 0
  };

  // 各新闻数据对象存储
  const newsData = {};
  let oListwrapper = null;

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
    const listWrapperTpl = NewsList.wrapperTpl(82);
    oApp.innerHTML += (headerTpl + navbarTpl + listWrapperTpl);
    oListwrapper = oApp.querySelector('.news-list');
  };

  // 渲染新闻列表
  function renderNewsList(data, pageNum) {
    const newsListTpl = NewsList.tpl(data[pageNum], pageNum);
    oListwrapper.innerHTML += newsListTpl;
    NewsList.imgShow();
  };

  // 绑定监听事件
  function bindEvent() {
    NavBar.bindClickEvent(setType);
  };

  // 切换新闻类型
  function setType(type) {
    config.type = type;
    config.pageNum = 0;
    oListwrapper.innerHTML = '';
    setNewsList();
    // console.log('设置类型成功啦我的宝~', config.type);
  };

  // 更新当前类型的新闻列表
  async function setNewsList() {
    const { type, count, pageNum } = config;
    // 前提: 如果该类型新闻已经请求过了并且在数据存储中存在，那么直接使用即可，否则重新请求

    // 1.存在
    if (newsData[type]) {
      console.log('缓存池中获取');
      renderNewsList(newsData[type], pageNum);
      return;
    }
    // 2.不存在: 重新请求
    oListwrapper.innerHTML = PageLoading.tpl();
    console.log('网络请求获取');
    newsData[type] = await API.getNewsList(type, count);
    // 测试: 区分一下和缓存的区别
    setTimeout(() => {
      oListwrapper.innerHTML = '';
      renderNewsList(newsData[type], pageNum);
    }, 1000);
  };

  init();

})(document);
