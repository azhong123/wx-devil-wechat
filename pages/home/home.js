// pages/home/home.js
import {Home} from 'home-model.js';
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
  onLoad: function (options) {
    this._loadData();
  },

 /**
  * 处理数据
  */
  _loadData: function(){
    var bannerType = '1';
    var data = home.getBannerData(bannerType);
  }
})