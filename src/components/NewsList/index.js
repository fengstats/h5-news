import tpl0 from './tpl/tpl0.tpl';
import tpl1 from './tpl/tpl1.tpl';
import tpl2 from './tpl/tpl2.tpl';
import tpl3 from './tpl/tpl3.tpl';
import wrapperTpl from './tpl/wrapper.tpl';

import './index.scss';

import { findNewsItemNode, tplReplace } from '../../libs/utils';


export default {
  name: 'NewsList',

  // 模板: 包裹新闻列表的盒子
  wrapperTpl(top) {
    return tplReplace(wrapperTpl, {
      top
    })
  },

  // 模板: 内部新闻列表
  tpl(data, pageNum) {
    let list = '';
    let tpl = null;

    // console.log(data);

    // 组装模板文件
    data.map((item, index) => {
      const { title, author_name: author, date, thumbnail_pic_s, thumbnail_pic_s02, thumbnail_pic_s03 } = item;
      // 判断使用哪个模板
      if (!thumbnail_pic_s) {
        // 没有图片
        tpl = tpl0;
      } else if (thumbnail_pic_s && !thumbnail_pic_s02) {
        // 有一张
        tpl = tpl1;
      } else if (thumbnail_pic_s02 && !thumbnail_pic_s03) {
        // 有两张
        tpl = tpl2;
      } else if (thumbnail_pic_s03) {
        // 有三张
        tpl = tpl3;
      }

      list += tplReplace(tpl, {
        pageNum,
        index,
        title,
        thumbnail_pic_s,
        thumbnail_pic_s02,
        thumbnail_pic_s03,
        author,
        date
      })
    });

    return list;
  },

  // 图片加载完成后显示的方法
  imgShow() {
    const imgList = document.querySelectorAll('img');
    [...imgList].map(item => {
      item.onload = function () {
        item.style.opacity = 1;
      }
    })
  },

  // 事件绑定
  bindEvent(oList, callback) {
    // 事件代理，由父节点去代理字节点的事件
    oList.addEventListener('click', this._goToDetail.bind(this, callback), false);
  },


  // 内部函数
  // 跳转至详情页
  _goToDetail(callback) {
    // console.log(arguments[1].target);
    const target = findNewsItemNode(arguments[1].target);
    if (!target) { return };
    const options = {
      index: target.dataset.index,
      pageNum: target.dataset.page,
    };
    console.log(options);
    callback(options);
    window.location.href = `detail.html?path=${location.pathname}`;
  }
}