import {
  Config
} from '../utils/config.js';
class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }

  /**
   * 设置统一的网络请求 默认 GET
   */
  request(params) {
    var url = this.baseRequestUrl + params.url;
    if (!params.type) {
      params.type = 'GET';
    }

    // if (!wx.getStorageSync('token')) {
    //   params.token = '';
    // }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqViouTVKyUjK0MDUwNDe0NDE00o0O8vdxjXd08fX001EAs0ODXYNilXSUMhNLlKwMTY2NTI2MjU0MgQIpQL6OUl5ibiqqIUDFqRUFYMXGhkYWhiaGtQAAAAD__w.0vxt4hL0GHWJrgQt-gXvCY2cnyloQTgl9ruu3ad29l4'
      },
      success: function(res) {
        params.sCallback && params.sCallback(res.data.data);
      },
      fail: function(err) {
        console.log(err);
      }
    })
  }

  /**
   * 获取 页面跳转传递的值
   */
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };
}
export {
  Base
};