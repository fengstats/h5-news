// 模板替换: 替换 {{ }} mustache语法中的变量为指定字符串
function tplReplace(template, templateObj) {
  // template导入是一个函数, 所以先执行
  return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
    // 将传入的变量对应字符串替换进入模板中, 注意可能有前后空格需要清除, 所以使用trim()方法去除
    return templateObj[key.trim()]
  })
}

// 滚动到顶部
function scrollTop() {
  // 使用定时器之后任务会滞后, 先等待页面渲染完成执行
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
}

// html display block 与 none
// true: block
// false: none
function tplHtmlBoolean(boolean) {
  return boolean ? 'block' : 'none'
}

// 格式化请求数据
function setPageData(data, count) {
  // 1.获取数据长度
  const len = data.length
  // 2.定义初始索引与需要返回数据的空数组
  let index = 0
  let list = []
  // 3.根据每count条数据一个数组进行数据分割放入空数组中
  while (index < len) {
    list.push(data.slice(index, (index += count)))
  }
  // 3.最终将数组返回出去
  return list
}

// 滚动到底部: 探底功能
function scrollToBottom(callback) {
  const scrollTop = Math.floor(_getScrollTop())
  const windowHeight = Math.floor(_getWindowHeight())
  // TODO: 给30px的容忍度
  const scrollHeight = Math.floor(_getScrollHeight()) - 30
  // console.log('scrollTop > windowHeight > scrollHeight', scrollTop, windowHeight, scrollHeight);
  if (scrollTop + windowHeight >= scrollHeight) {
    // 探底了
    // console.log('reach bottom');
    callback()
  }
}

// 用于找到新闻列表的单个新闻节点
function findNewsItemNode(target) {
  while (target) {
    let className = target.className.split(' ')[0]
    // console.log(className);
    if (className === 'news-item') {
      return target
    } else if (className === 'news-list') {
      return null
    }
    target = target.parentNode
  }
}

// 用于找到url中query参数key所对应的value
function findUrlQuery(key) {
  const reg = new RegExp(`(^|&)${key}=(.*?)(&|$)`)
  const pathNameList = window.location.search.substr(1).match(reg)
  return pathNameList ? pathNameList[2] : '/'
}

// 导出方法
export { tplReplace, tplHtmlBoolean, scrollTop, setPageData, scrollToBottom, findNewsItemNode, findUrlQuery }

// 内部方法
function _getScrollTop() {
  var scrollTop = 0,
    bodyScrollTop = 0,
    documentScrollTop = 0
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop
  return scrollTop
}

function _getWindowHeight() {
  var windowHeight = 0
  if (document.compatMode == 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

function _getScrollHeight() {
  var scrollHeight = 0,
    bodyScrollHeight = 0,
    documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight = bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight
  return scrollHeight
}
