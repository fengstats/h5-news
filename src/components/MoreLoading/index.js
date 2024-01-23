import tpl from './index.tpl'
import './index.scss'

// 导入工具函数
import { tplReplace, tplHtmlBoolean } from '../../libs/utils'

export default {
  name: 'MoreLoading',
  // 内部模板函数
  _tpl(isLoading) {
    return tplReplace(tpl, {
      isLoading: tplHtmlBoolean(isLoading),
      text: isLoading ? '正在加载...' : '没有更多新闻可以加载啦~',
    })
  },

  // 添加
  add(oList, isLoading) {
    // 1.如果more-loading这个模板已经有了, 不添加
    const MoreLoading = oList.querySelector('.more-loading')
    if (!MoreLoading) {
      // console.log('测试一下 111', oList);
      // TODO: 2.如果没有才添加 innerHTML的HTML要大写!!!
      oList.innerHTML += this._tpl(isLoading)
    }
  },

  // 删除
  remove(oList) {
    // 有就删除，没有就没有
    const MoreLoading = oList.querySelector('.more-loading')
    MoreLoading && MoreLoading.remove()
  },
}
