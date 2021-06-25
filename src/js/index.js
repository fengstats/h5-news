import './imports';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';
import PageLoading from '../components/PageLoading';
import MoreLoading from '../components/MoreLoading';
import ErrorTip from '../components/ErrorTip';

// API
import API from '../api';

// 导入工具函数
import { scrollToBottom } from '../libs/utils';

// 导入静态类型对象
import { NEWS_TYPE } from '../data';

; ((doc) => {
  // 请求配置对象
  const config = {
    // 请求类型: 可更改
    type: 'top',
    // 每页显示条数
    count: 10,
    // 当前页码
    pageNum: 0,
    // 是否正在加载中
    isLoading: false
  };

  // 各新闻数据对象存储
  const newsData = {};
  let oListwrapper = null;
  let t = null;

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
    MoreLoading.remove(oListwrapper);
    oListwrapper.innerHTML += newsListTpl;
    config.isLoading = false;
    NewsList.imgShow();
  };

  // 绑定监听事件
  function bindEvent() {
    NavBar.bindClickEvent(setType);
    // NewsList点击绑定
    NewsList.bindEvent(oListwrapper, setCurrentNews);
    // 窗口滚动事件绑定
    window.addEventListener('scroll', scrollToBottom.bind(null, getMoreNewsList), false);
  };

  // 切换新闻类型
  function setType(type) {
    // console.log('切换类型');
    config.type = type;
    config.pageNum = 0;
    oListwrapper.innerHTML = '';
    setNewsList();
  };

  // 更新当前类型的新闻列表
  async function setNewsList() {
    const { type, count, pageNum } = config;
    // 前提: 如果该类型新闻已经请求过了并且在数据存储中存在，那么直接使用即可，否则重新请求

    // 1.存在
    if (newsData[type]) {
      // console.log('缓存池中获取');
      renderNewsList(newsData[type], pageNum);
      return;
    }
    // 2.不存在: 重新请求
    oListwrapper.innerHTML = PageLoading.tpl();
    // console.log('网络请求获取');
    const res = await API.getNewsList(type, count);
    oListwrapper.innerHTML = '';
    if (res === 404) {
      // console.log(404);
      const errorTipTpl = ErrorTip.tpl('未发现网络，请您稍后再试');
      oListwrapper.innerHTML += errorTipTpl;
      return;
    }
    newsData[type] = res;
    // 测试: 区分一下和缓存的区别
    // setTimeout(() => {
    renderNewsList(newsData[type], pageNum);
    // }, 1000);
  };

  // 获取更多列表数据
  function getMoreNewsList() {
    if (newsData[config.type]) {
      // 当前类型新闻在缓存池中
      if (!config.isLoading) { // 锁是打开的
        // console.log('reach bottom');
        clearTimeout(t);
        // 当前页码++
        config.pageNum++;
        const { pageNum, type } = config;
        if (pageNum < newsData[type].length) {
          // 1.还有数据可加载
          // 把锁锁上
          config.isLoading = true;
          MoreLoading.add(oListwrapper, true);
          t = setTimeout(() => {
            setNewsList();
          }, 300);
        } else {
          // 2.没有更多数据可加载了
          MoreLoading.add(oListwrapper, false);
        }
      }
    }
  };


  // 设置当前新闻保存至localstorage
  // options: { pageNum: 哪一页, index: 哪一个 }
  function setCurrentNews(options) {
    const { index, pageNum } = options;
    const currentNews = newsData[config.type][pageNum][index];
    // console.log(options, currentNews);
    localStorage.setItem('currentNews', JSON.stringify(currentNews));
  }

  init();

})(document);
