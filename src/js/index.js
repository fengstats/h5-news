import './imports';

// 导入头部组件
import Header from '../components/Header';

// 导入样式文件
import '../assets/styles/index.scss';

// console.log("index");

// import API from '../api';
// TODO: 测试请求是否有问题
// async function getNewsList() {
//   const data = await API.getNewsList('top', 10);
//   console.log(data);
// }
// getNewsList();

// 立即执行函数: 传入一个document用于操作页面dom
; ((doc) => {

  // 1.获取绑定元素
  const oApp = doc.querySelector('#app');

  // 2.定义初始化方法
  const init = () => {
    render();
  }

  // 3.定义渲染方法
  function render() {
    const HeaderTpl = Header.tpl({
      url: '/',
      title: '新闻头条',
      showLeftIcon: true,
      showRightIcon: true
    });

    oApp.innerHTML += HeaderTpl;
  }

  // 4.执行初始化方法
  init();

})(document);
