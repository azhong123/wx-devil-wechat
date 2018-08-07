// pages/my/address/address-list/address-list.js
import {
  Address
} from '../address-list/address-list-model.js';

var address = new Address();

var addressData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: [],
    address: {},

    showArea: false,
    currentTab: 1,
    country: [],
    residecity: [],
    resideprovince: [],

    curr_pro: '',
    curr_cit: '',
    curr_cou: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadData(options);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    address.hideLoading();
    // 加载显示异常
    this.dialog = this.selectComponent(".mydialog");
  },

  /**
   * 加载数据
   */
  _loadData: function() {
    address.addressList((event) => {
      if (address.isSuccess(event)) {
        var res = event.data.data;
        // 添加姓氏
        res.forEach((item) => {
          item.family_name = item.customerName.substr(0, 1);
        })
        this.setData({
          addressData: res
        });
      }

    })
  },
  diytoast: function() {
    this.dialog.show("这是我的自定义弹窗");
  },

  /**
   * 跳转结算页面
   */
  backsettleaccounts: function(event) {
    var addressData = address.getDataSet(event, "address");
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      chooseAddressData: addressData
    })
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 编辑收货地址
   */
  updateaddress: function(event) {
    wx.navigateTo({
      url: '../../../../pages/my/address/address-detail/address-detail',
    })
  },

  /**
   * 保存收获地址
   */
  saveaddress: function() {
    this.dialog.show("这是我的自定义弹窗");
    wx.navigateTo({
      url: '../../../../pages/my/address/address-save/address-save',
    })
  },



})