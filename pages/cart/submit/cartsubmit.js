// pages/cart/submit/cartsubmit.js
import {
  CartSubmit
} from '../submit/cartsubmit-model.js';

import {
  OrderSubmit
} from '../../../pages/order/ordersubmit/ordersubmit-model.js';
var cartSubmit = new CartSubmit();
var orderSubmit = new OrderSubmit();

var cartSubmitObj = null;
var shoppingCartIds = [];
var addressData = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartSubmitObj: null,
    addressData: null,
    shoppingCartIds: []
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var chooseAddressData = currPage.data.chooseAddressData;
    if (chooseAddressData) {
      this.setData({
        addressData: chooseAddressData
      })
    }
    cartSubmit.hideLoading();
    this.dialog = this.selectComponent(".mydialog");
  },

  /**
   * 加载数据
   */
  _loadData: function(event) {
    var ids = JSON.parse(event.shoppingCartIds);
    cartSubmit.cartPay(ids, (revent) => {
      if (cartSubmit.isSuccess(revent)) {
        var res = revent.data.data;
        this.data.cartSubmitObj = res;
        this.setData({
          shoppingCartIds: ids,
          addressData: this.data.cartSubmitObj.addressDTO,
          cartSubmitObj: this.data.cartSubmitObj
        });
      }

    });
  },

  /**
   * 订单去支付
   */
  orderToPay: function() {
    var data = this.data.cartSubmitObj;
    if (!data.addressDTO) {
      this.dialog.show("请填写您的收货地址");
      return;
    }
    var orderPay = {
      shoppingCartIds: this.data.shoppingCartIds,
      addressId: data.addressDTO.addressId
    };
    orderSubmit.orderSubmit(orderPay, (revent) => {
      if (orderSubmit.isSuccess(revent)) {
        this.dialog.show("订单提交成功");
        orderSubmit.hideLoading();
      }
    });
  },

  /**
   * 地址选择
   */
  chooseAddres: function() {
    wx.navigateTo({
      url: '../../../pages/my/address/address-list/address-list',
    })
  }
})