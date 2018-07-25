import {
  Base
} from '../../utils/base.js';

class Cart extends Base {
  constructor() {
    super();
  }

  /**
   * 加入购物车
   */
  addCart(cart, callback) {
    var param = {
      url: '/shopping/v1/cart/add',
      token: wx.getStorageSync('token'),
      type: 'POST',
      data: cart,
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

  /**
   * 获取我的购物车数量
   */
  getCartCount(callback) {
    var param = {
      url: '/shopping/v1/cart/count',
      token: wx.getStorageSync('token'),
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }
}
export {
  Cart
};