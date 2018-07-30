import {
  Cart
} from 'cart-model.js';
var cart = new Cart();

var cartData = null;
var len = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 页面隐藏触发的事件
   */
  onHide: function() {

    var cartData = this.data.cartData,
      len = cartData.length,
      cartObjs = new Array();
    for (let i = 0; i < len; i++) {
      var cartObj = {
        shoppingCartId: cartData[i].shoppingCartId,
        goodsId: cartData[i].goodsListDTO.goodsId,
        goodsNum: cartData[i].goodsNum,
        goodsPrice: cartData[i].goodsPrice,
        isChecked: cartData[i].isChecked,
      };
      cartObjs.push(cartObj);
    }

    cart.saveShoppingCarts(cartObjs, (res) => {
      cart.execSetStorageSync(this.data.cartData);

    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    cart.getAllShoppingCart((res) => {
      // 将数据同步放入缓存中
      cart.execSetStorageSync(res);
      this._loadData();
    });
  },

  /**
   * 获取当前用户的所有购物车信息
   */
  _loadData: function() {
    cartData = cart.getCartDataFromLocal();
    // 计算选择的数量及商品价格
    var cal = this._calcTotalAccountAndCounts(cartData);
    this.setData({
      selectedCounts: cal.selectedCounts,
      selectedTypeCounts: cal.selectedTypeCounts,
      selectedShoppingCartIds: cal.selectedShoppingCartIds,
      account: cal.account,
      cartData: cartData
    })
  },

  /**
   * 计算选择数量及选中商品的价格
   */
  _calcTotalAccountAndCounts: function(cartData) {
    var len = cartData.length,
      // 所需要计算的总价格，但是要注意排除掉未选中的商品
      account = 0,

      // 购买商品的总个数
      selectedCounts = 0,

      // 购买商品种类的总数
      selectedTypeCounts = 0;

    let multiple = 100;
    var selectedShoppingCartIds = new Array();
    for (let i = 0; i < len; i++) {
      if (cartData[i].isChecked == '1') {
        account += cartData[i].goodsNum * multiple * Number(cartData[i].goodsPrice) * multiple;
        selectedCounts += cartData[i].goodsNum;
        selectedShoppingCartIds.push(cartData[i].shoppingCartId);
        selectedTypeCounts++;
      }
    }
    return {
      selectedCounts: selectedCounts,
      selectedShoppingCartIds: selectedShoppingCartIds,
      selectedTypeCounts: selectedTypeCounts,
      account: account / (multiple * multiple)
    }
  },

  /**
   * 切换购物车选中状态
   */
  toggleSelect: function(event) {
    var shoppingcartid = cart.getDataSet(event, 'shoppingcartid'),
      ischecked = cart.getDataSet(event, 'ischecked'),
      index = this._getProductIndexById(shoppingcartid);
    if (ischecked == '1') {
      this.data.cartData[index].isChecked = '0'
    } else {
      this.data.cartData[index].isChecked = '1'
    }
    this._resetCartData();
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
      selectedShoppingCartIds: newData.selectedShoppingCartIds,
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
   * 全选/反选
   */
  toggleSelectAll: function(event) {
    var status = cart.getDataSet(event, 'ischecked') == '1';
    var data = this.data.cartData,
      len = cartData.length;
    for (let i = 0; i < len; i++) {
      if (status) {
        data[i].isChecked = '0';
      } else {
        data[i].isChecked = '1';
      }
    }
    this._resetCartData();
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
  },

  /**
   * 删除缓存中的数据
   */
  delete: function(event) {
    var shoppingcartid = cart.getDataSet(event, 'shoppingcartid'),
      index = this._getProductIndexById(shoppingcartid);

    this.data.cartData.splice(index, 1); //删除某一项商品

    this._resetCartData();

    var cartObj = {
      shoppingCartIds: [shoppingcartid]
    }
    //删除服务器中的购物车信息
    cart.deleteShoppingCart(cartObj);

    // 删除缓存中的购物车信息
    cart.delete(shoppingcartid);
  },

  /**
   * 购物车结算
   */
  cartSubmit: function(event) {
    var shoppingCartIds = cart.getDataSet(event, "shoppingcartids");
    wx.navigateTo({
      url: '../cart/submit/cartsubmit?shoppingCartIds=' + JSON.stringify(shoppingCartIds),
    })
  },

  /**
   * 跳转 商品详情页
   */
  onProductsItemTap: function(event) {
    var id = cart.getDataSet(event, "id");
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  }



})