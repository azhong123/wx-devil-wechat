import {
  Base
} from '../../utils/base.js';
class Theme extends Base {
  constructor() {
    super();
  }

  /**
   * 获取主题详情
   */
  getThemeDetail(id, callback) {
    var params = {
      url: "/index/v1/theme/one/" + id,
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(params);
  }
}
export {
  Theme
};