import {
  Base
} from '../../utils/base.js';
class Home extends Base {
  constructor() {
    super();
  }

  getBannerData(bannerType, callBack) {
    var params = {
      url: '/index/v1/banner/' + bannerType,
      sCallBack: function(res) {
        console.log(res);
        callBack && callBack(res);
      }
    };
    this.request(params);
  }
}
export {
  Home
};