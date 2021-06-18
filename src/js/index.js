import './imports';

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
  init({
    url: '/',
    title: '新闻头条',
    showLeftIcon: true,
    showRightIcon: true
  }, doc);
})(document);
