class Util {

  constructor() {
  }

  /**
   * 验证手机号码
   */
  checkMobile(mobile) {
    if (mobile == '') {
      wx.showToast({
        title: '请输入手机号！',
        image: '/imgs/icon/sigh@message.png',
        duration: 1500,
        mask: true
      })
      return false
    } else if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        image: '/imgs/icon/error@message.png',
        duration: 1500,
        mask: true
      })
      return false;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        image: '/imgs/icon/error@message.png',
        duration: 1500
      })
      return false;
    }
    return true;
  };

  /**
   * 验证用户名
   */
  checkUserName(param) {
    if (param == '') {
      wx.showToast({
        title: '用户名不可为空',
        image: '/imgs/icon/error@message.png',
        duration: 1000,
        mask: true
      })
      return false
    }
    return true;
  }
}
export {
  Util
}