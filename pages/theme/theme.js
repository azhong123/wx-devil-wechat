// pages/theme/theme.js
import {
  Theme
} from 'theme-model.js';
var theme = new Theme;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    name: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.id = options.id;
    this.data.name = options.name;
    this._loadData();
  },

  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.name,
    })
  },

  /**
   * 获取主题详情
   */
  _loadData: function() {
    theme.getThemeDetail(this.data.id, (res) => {
      this.data.name = res.name;
      this.setData({
        "themeDetail": res
      });
    });
  },

  /**
   * 跳转 商品详情页
   */
  onProductsItemTap: function(event) {
    var id = theme.getDataSet(event, "id");
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  }
})