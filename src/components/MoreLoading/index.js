import tpl from './index.tpl';
import './index.scss';

// 导入工具函数
import { tplReplace } from '../../libs/utils';

export default {
  name: 'MoreLoading',
  // 内部模板函数
  _tpl(isLoading, text) {
    return tplReplace(tpl, {
      isLoading,
      text
    })
  },

  // 添加
  add() {

  },

  // 删除
  remove() {

  }
}