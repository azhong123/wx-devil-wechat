// pages/cart/submit/cartsubmit.js
import {
  CartSubmit
} from '../submit/cartsubmit-model.js';
var cartSubmit = new CartSubmit();
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
    this.data.shoppingCartIds = options.shoppingCartIds;
    this._loadData();
  },

  _loadData: function() {
    cartSubmit.cartPay(this.data.shoppingCartIds, (res) => {
      console.log(res);
    });
  }
})