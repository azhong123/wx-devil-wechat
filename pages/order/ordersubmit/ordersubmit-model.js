import {
  Base
} from '../../../utils/base.js';

class OrderSubmit extends Base {
  constructor(){
    super();
  }

  /**
   * 订单提交
   */
  orderSubmit(orderSubmitObj ,callback){
    var param = {
      url: '/order/v1/submit',
      token: wx.getStorageSync('token'),
      type: 'POST',
      data: orderSubmitObj,
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }
}
export {
  OrderSubmit
}