import FastClick from './fastclick'

// 在页面加载时挂载FastClick插件
window.addEventListener(
  'load',
  function () {
    FastClick.attach(document.body)
  },
  false,
)

// 多指错误禁止
document.documentElement.addEventListener(
  'touchmove',
  function (event) {
    if (event.touches.length > 1) {
      // 禁止事件
      event.preventDefault()
    }
  },
  false,
)

// 设置字体 rem 适配
// 这里以 iphone6 为标准页面 375 x 667
document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px'
