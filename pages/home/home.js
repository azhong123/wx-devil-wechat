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
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
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
      this.setData({
        'productArr': res
      });
    });
  },
  /**
   * 跳转 商品详情页
   */
  onProductsItemTap: function(event) {
    var id = home.getDataSet(event, "id");
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },

  /**
   * 跳转活动详情页
   */
  onThemeItemTap: function(event) {
    var id = home.getDataSet(event, "id");
    var name = home.getDataSet(event, "name");
    wx.navigateTo({
      url: '../theme/theme?id=' + id + '&name=' + name,
    })
  }
})