import {
  Base
} from '../../utils/base.js';
class Product extends Base {
  constructor() {
    super();
  }

  /**
   * 获取商品详情
   */
  getGoodsDetail(id, callback) {
    var params = {
      url: '/goods/v1/detail/' + id,
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(params);
  }

  /**
   * 获取商品详情图片
   */
  getGoodsDetailImg(id, callback) {
    var params = {
      url: '/goods/v1/img/' + id,
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(params);
  }

  /**
   * 获取商品规格信息
   */
  getGoodsParamItems(id, callback) {
    var params = {
      url: '/goods/v1/param/' + id,
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(params);
  }

}
export {
  Product
};