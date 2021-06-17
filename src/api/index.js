import HTTP from '../libs/http';


// 继承一个自己封装的HTTP类
class Service extends HTTP {
  // 获取新闻列表数据: type=类型 count=条数
  getNewsList(type, count) {
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
          resolve(data);
        },
        // 失败
        error(err) {
          reject(err);
        }
      })
    })
  }
};

// 导出时实例化, 不考虑复用性, 减少外部实例化代码
export default new Service();