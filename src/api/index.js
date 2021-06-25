import HTTP from '../libs/http';
import { setPageData } from '../libs/utils';


// 继承一个自己封装的HTTP类
class Service extends HTTP {
  // 获取新闻列表数据: type=类型 count=条数
  getNewsList(type, count) {
    // console.log('当前请求新闻类型: ', type);
    // 返回一个promise对象让外部好接收数据处理 async await
    return new Promise((resolve, reject) => {
      this.ajax({
        url: 'Juhe/getNewsList',
        type: 'POST',
        dataType: 'JSON',
        data: {
          field: type
        },
        // 成功
        success(data) {
          // console.log(data.result.data);
          const pageData = setPageData(data.result.data, count);
          resolve(pageData);
        },
        // 失败
        error(err) {
          // reject(err);
          resolve(404);
        }
      })
    })
  }
};

// 导出时实例化, 不考虑复用性, 减少外部实例化代码
export default new Service();