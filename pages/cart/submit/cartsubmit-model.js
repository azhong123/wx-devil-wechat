import {
  Base
} from '../../../utils/base.js';
class CartSubmit extends Base {
  constructor() {
    super();
  }

  /**
   * 购物车提交结算
   */
  cartPay(shoppingCartIds, callback) {
    var cartObj = {
      shoppingCartIds: shoppingCartIds
    }
    var param = {
      url: '/shopping/v1/cart/pay',
      token: wx.getStorageSync('token'),
      type: 'POST',
      data: cartObj,
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

}
export {
  CartSubmit
}