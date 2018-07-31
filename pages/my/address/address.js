// pages/my/address/address.js
import {
  Address
} from '../address/address-model.js';
var address = new Address();
var addressData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadData(options);
  },

  /**
   * 加载数据
   */
  _loadData: function() {
    address.addressList((res) => {
      this.setData({
        addressData: res
      });
    })
  }
})