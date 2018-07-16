// pages/home/home.js
import {
  Home
} from 'home-model.js';
var home = new Home;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadData();
  },

  /**
   * 处理数据
   */
  _loadData: function() {
    var bannerType = '1';
    var themeType = '0';

    // 获取 banner 数据
    home.getBannerData(bannerType, (res) => {
      this.setData({
        'bannerArr': res
      });
    });

    // 获取 theme 数据
    home.getThemeData(themeType, (res) => {
      this.setData({
        'themeArr': res
      });
    });

    // 获取 latest 最新上新商品
    home.getLatestProducts((res) => {
      console.log(res);
      this.setData({
        'productArr': res
      });
    });
  }
})