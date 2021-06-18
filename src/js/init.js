// 导入头部组件
import Header from '../components/Header';


// 立即执行函数: 传入一个document用于操作页面dom

function INITPAGE(options, doc) {
    // 1.获取绑定元素
    const oApp = doc.querySelector('#app');

    // 2.定义初始化方法
    const init = () => {
      render();
    }
  
    // 3.定义渲染方法
    function render() {
      const HeaderTpl = Header.tpl(options);
      oApp.innerHTML += HeaderTpl;
    }
  
    // 4.执行初始化方法
    init();
}

// 导出初始化页面方法
export default INITPAGE;