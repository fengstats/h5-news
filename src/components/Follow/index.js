import tpl from './index.tpl'
import './index.scss'

import { tplReplace } from '../../libs/utils'

export default {
  name: 'Follow',

  tpl(status) {
    return tplReplace(tpl, {
      isStar: status ? 'star' : 'star-no',
    })
  },

  // 绑定点击事件
  bindEvent(doFollow) {
    const oFollow = document.querySelector('.follow')
    oFollow.addEventListener('click', this._setFollow.bind(this, oFollow, doFollow), false)
  },

  // 设置Follow的star与star-no的类样式
  _setFollow(oFollow, doFollow) {
    // 1.先将oFollow的className保存起来
    const className = oFollow.className
    // 2.写一个初始化类样式
    const templateClass = 'follow iconfont icon-'
    // 3.判断是否收藏
    switch (className) {
      case templateClass + 'star':
        oFollow.className = templateClass + 'star-no'
        doFollow(false)
        break
      case templateClass + 'star-no':
        oFollow.className = templateClass + 'star'
        doFollow(true)
        break
      default:
        break
    }
  },
}
