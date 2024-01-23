import itemTpl from './tpl/item.tpl'
import wrapperTpl from './tpl/idnex.tpl'
import './index.scss'

import { tplReplace, scrollTop } from '../../libs/utils'

export default {
  name: 'NavBar',
  // 当前选中导航下标
  _curIndex: 0,
  // 返回内部模板html
  tpl(data) {
    // 定义一个itemList用于接收所有item的html
    let itemList = ''

    // 处理每个item
    data.forEach(({ type, title }, index) => {
      itemList += tplReplace(itemTpl, {
        isCurrent: this._curIndex === index ? 'current' : '',
        type,
        title,
      })
    })

    // 返回父组件html
    return tplReplace(wrapperTpl, {
      itemList,
      wrapperW: 0.6 * data.length,
    })
  },

  // 绑定所有导航的点击事件: 通过事件代理的方式绑定在父节点上
  bindClickEvent(setType) {
    // 拿到父节点与所有字节点元素
    const oNavBar = document.querySelector('.nav')
    const oNavItems = document.querySelectorAll('.item')

    // console.log('oNavBar: ', oNavBar);

    oNavBar.addEventListener('click', this._setNav.bind(this, oNavItems, setType), false)
  },

  // 内部方法: 设置导航
  _setNav(navItems, setType) {
    // 拿到被点击的元素目标节点
    const tarNode = arguments[2].target
    const className = tarNode.className.trim()

    // 判断是否为可设置导航: 如果当前节点已经选中则不可再次设置, 只有类名只有item时可以设置
    if (className === 'item') {
      // 重新设置导航
      // 1.先将选中节点样式选中样式去除
      navItems[this._curIndex].className = 'item'

      // 2.把目标节点设置选中样式: 设置当前目标下标
      // 使用 [...] 的原因是因为 navItems 选出来的节点组成的数组是一个伪数组, 没有indexOf()方法, 使用 [...] 的方式可以让其变成一个真正的数组
      // this._curIndex = [...navItems].indexOf(tarNode);
      // TODO: 这种方法是看视频的, 目前并不是很理解, call在其中起到的作用是
      // 现在理解了，简写的方式找到 Array.prototype.indexOf
      // 并且传递 navItems 调用，参数为 tarNode
      this._curIndex = [].indexOf.call(navItems, tarNode)

      // 3.因为我们使用原生js, 这里是没有响应式的, 所以我们需要手动将current类样式设置到指定元素上
      // TODO: += 记得添加一个 空格 哦, 不然类名会合在一次的
      navItems[this._curIndex].className += ' current'

      // 4.因为我们选中的元素改变了, 所以对应的请求数据的类型也需要修改, type我们使用data-type在tpl文件中定义好了, 所以直接使用dataset下获取就行了
      const type = tarNode.dataset.type
      setType(type)
      scrollTop()

      // console.log(this._curIndex);
    }
    // console.log(tarNode.dataset);
  },
}
