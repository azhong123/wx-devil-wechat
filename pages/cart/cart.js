import {
  Cart
} from 'cart-model.js';
var cart = new Cart();

var cartData = null;
var len = 0;
// 所需要计算的总价格，但是要注意排除掉未选中的商品
var account = 0;
// 购买商品的总个数
var selectedCounts = 0;
// 购买商品种类的总数
var selectedTypeCounts = 0;
var storageKeyName = 'cart';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData: [],
    len: 0,
    account: 0,
    selectedCounts: 0,
    selectedTypeCounts: 0,
    storageKeyName: 'cart'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this._loadData();
  },

  /**
   * 获取当前用户的所有购物车信息
   */
  _loadData: function() {
    cart.getAllShoppingCart((res) => {
      // 将数据放入缓存中
      wx.setStorageSync(this.data.storageKeyName, res);
    });
    var cartData = cart.getCartDataFromLocal();
    // 计算选择的数量及商品价格
    var cal = this._calcTotalAccountAndCounts(cartData);
    this.setData({
      selectedCounts: cal.selectedCounts,
      selectedTypeCounts: cal.selectedTypeCounts,
      account: cal.account,
      cartData: cartData
    })
  },

  /**
   * 计算选择数量及选中商品的价格
   */
  _calcTotalAccountAndCounts: function(cartData) {
    len = cartData.length;

    let multiple = 100;
    for (let i = 0; i < len; i++) {
      if (cartData[i].isChecked == '1') {
        account += cartData[i].goodsNum * multiple * Number(cartData[i].goodsPrice) * multiple;
        selectedCounts += cartData[i].goodsNum;
        selectedTypeCounts++;
      }
    }
    return {
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts,
      account: account / (multiple * multiple)
    }
  },

  /**
   * 重新计算总金额和商品总数
   */
  _resetCartData: function() {

    var newData =
      this._calcTotalAccountAndCounts(this.data.cartData);
    this.setData({
      account: newData.account,
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts,
      cartData: this.data.cartData
    });
  },

  /**
   * 根据商品id得到 商品所在下标
   */
  _getProductIndexById: function(shoppingCartId) {
    var cartData = this.data.cartData,
      len = cartData.length;
    for (let i = 0; i < len; i++) {
      if (cartData[i].shoppingCartId == shoppingCartId) {
        return i;
      }
    }
  },

  /**
   * 更新缓存中的购物车商品数量
   */
  changeCounts: function(event) {
    var shoppingcartid = cart.getDataSet(event, 'shoppingcartid'),
      type = cart.getDataSet(event, 'type'),
      index = this._getProductIndexById(shoppingcartid),
      counts = 1;

    if (type == 'add') {
      cart.addCounts(shoppingcartid);
    } else {
      counts = -1;
      cart.cutCounts(shoppingcartid);
    }

    this.data.cartData[index].goodsNum += counts;
    this._resetCartData();
  }



})