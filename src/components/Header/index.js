// 导入样式与视图文件, 处理完后以模块形式导出
import './index.scss'
import tpl from './index.tpl'

// 导入工具方法
import { tplReplace, tplHtmlBoolean } from '../../libs/utils'

export default {
  name: 'Header',
  // 模板抛出
  tpl(options) {
    const { url, title, showLeftIcon, showRightIcon } = options
    return tplReplace(tpl, {
      url,
      title,
      showLeftIcon: tplHtmlBoolean(showLeftIcon),
      showRightIcon: tplHtmlBoolean(showRightIcon),
    })
  },
}
