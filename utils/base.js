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
    this.showLoading("加载中。。。。");
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
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqViouTVKyUjK0MDUwNDe0NDE00o0O8vdxjXd08fX001EAs0ODXYNilXSUMhNLlKwMTY2NjQyNjU2MgQIpQL6OUl5ibiqqIUDFqRUFEMUWhhaGJsa1AAAAAP__.xSJJKE4063K4uiadN-IOFNpVDUvhMPwFUW50j__XRiU'
      },
      success: function(res) {
        params.sCallback && params.sCallback(res);
      },
      fail: function(err) {
        console.log(err);
      }
    })
  };

  /**
   * 获取 页面跳转传递的值
   */
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

  /**
   * 请求是否成功
   */
  isSuccess(event) {
    if (event.data.code == 'K-000000') {
      return true;
    }
    return false;
  };

  /**
   * 显示等待
   */
  showLoading(message) {
    if (wx.showLoading) {
      // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
      wx.showLoading({
        title: message,
        mask: true
      });
    } else {
      // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
      wx.showToast({
        title: message,
        icon: 'loading',
        mask: true,
        duration: 20000
      });
    }
  };

  /**
   * 隐藏等待
   */
  hideLoading() {
    if (wx.hideLoading) {
      // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
      wx.hideLoading();
    } else {
      wx.hideToast();
    }
  };
}
export {
  Base
};