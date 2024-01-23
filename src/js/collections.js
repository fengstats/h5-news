import './imports'

// 导入头部组件
import Header from '../components/Header'
// 导入新闻列表组件
import NewsList from '../components/NewsList'
// 导入没有数据提示组件
import NodataTip from '../components/NodataTip'
;((doc) => {
  const oApp = doc.querySelector('#app')

  // 获取收藏列表
  const followList = JSON.parse(localStorage.getItem('followList')) || []

  // 保存全局变量, 易于使用, 用于后续在其它方法中处理此标签
  let oListWrapper = null

  const init = () => {
    render()
    bindEvent()
  }

  function render() {
    const headerTpl = Header.tpl({
      url: '/',
      title: '小陈收藏',
      showLeftIcon: true,
      showRightIcon: false,
    })
    if (followList.length) {
      // 有数据
      const NewsListTpl = NewsList.wrapperTpl(44)
      oApp.innerHTML += headerTpl + NewsListTpl
      oListWrapper = oApp.querySelector('.news-list')
      renderList(followList)
    } else {
      // 无数据
      const noDataTip = NodataTip.tpl('您还没有收藏新闻哦~')
      oApp.innerHTML += headerTpl + noDataTip
    }
  }

  function renderList(data) {
    oListWrapper.innerHTML += NewsList.tpl(data, -1)
    NewsList.imgShow()
  }

  // 将当前跳转的新闻保存至浏览器缓存
  function setCurrentNews(options) {
    const { index } = options
    localStorage.setItem('currentNews', JSON.stringify(followList[index]))
  }

  function bindEvent() {
    oListWrapper && NewsList.bindEvent(oListWrapper, setCurrentNews)
  }

  init()
})(document)
