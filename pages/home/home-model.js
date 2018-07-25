import {
  Base
} from '../../utils/base.js';
var token = '';
class Home extends Base {
  constructor() {
    super();
  }

  /**
   * 获取 banner 数据
   */
  getBannerData(bannerType, callback) {
    var params = {
      url: '/index/v1/banner/' + bannerType,
      token: "",
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(params);
  }

  /**
   * 获取 theme 数据
   */
  getThemeData(themeType, callback) {
    var params = {
      url: '/index/v1/theme/list/' + themeType,
      token: "",
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(params);
  }

  /**
   * 获取 latest 最新上新商品
   */
  getLatestProducts(callback) {
    var params = {
      url: '/goods/v1/goods/latest',
      token: "",
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(params);
  }

}
export {
  Home
};