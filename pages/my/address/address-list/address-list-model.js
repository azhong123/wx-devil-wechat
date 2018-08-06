import {
  Base
} from '../../../../utils/base.js';

class Address extends Base {
  constructor() {
    super();
  }

  /**
   * 地址列表
   */
  addressList(callback) {
    var param = {
      url: '/customers/v1/address/list',
      token: wx.getStorageSync('token'),
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

}
export {
  Address
}