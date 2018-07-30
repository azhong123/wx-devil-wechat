// pages/cart/submit/cartsubmit.js
import {
  CartSubmit
} from '../submit/cartsubmit-model.js';
var cartSubmit = new CartSubmit();

var cartSubmitObj = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartSubmitObj: null
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
  _loadData: function(event) {
    var ids = JSON.parse(event.shoppingCartIds);
    cartSubmit.cartPay(ids, (res) => {
      this.data.cartSubmitObj = res;
      this.setData({
        cartSubmitObj: this.data.cartSubmitObj
      });
      console.log(res);
    });
  }
})