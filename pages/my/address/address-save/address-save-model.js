import {
  Base
} from '../../../../utils/base.js';

class AddressSave extends Base {
  constructor() {
    super();
  }

  /**
   * 获取城市列表
   */
  getChinaCitys(callback) {
    var param = {
      url: '/city/v1',
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  };

  /**
   * 保存收货地址
   */
  saveAddress(saveAddressObj, callback) {
    var param = {
      url: '/customers/v1/address/save',
      token: wx.getStorageSync('token'),
      type: 'POST',
      data: saveAddressObj,
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

}
export {
  AddressSave
}