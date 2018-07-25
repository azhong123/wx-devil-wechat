import {
  Base
} from '../../utils/base.js';
class Category extends Base {
  constructor() {
    super();
  }

  /**
   * 获取所有的分类信息
   */
  getCategoryType(callback) {
    var param = {
      url: '/goods/v1/cate/all',
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

  /**
   * 获取分类下的商品
   */
  getProductsByCategory(cateId, callback) {
    var param = {
      url: '/goods/v1/category?cateId=' + cateId,
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }
}
export {
  Category
};