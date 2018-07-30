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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartSubmitObj: null,
    shoppingCartIds: []
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
        shoppingCartIds: ids,
        cartSubmitObj: this.data.cartSubmitObj
      });
      console.log(res);
    });
  },

  /**
   * 订单去支付
   */
  orderToPay: function() {
    var data = this.data.cartSubmitObj;
    if (!data.addressDTO) {
      this.showTips('下单提示', '请填写您的收货地址');
      return;
    }
    var orderPay = {
      shoppingCartIds: this.data.shoppingCartIds,
      addressId: data.addressDTO.addressId
    };
    orderSubmit.orderSubmit(orderPay, (res)=>{

    });
  }
})