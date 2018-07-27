import {
  Base
} from '../../utils/base.js';

class Cart extends Base {
  constructor() {
    super();
    this._storageKeyName = 'cart';
  }

  /**
   * 加入购物车
   */
  addCart(cart, callback) {
    var param = {
      url: '/shopping/v1/cart/add',
      token: wx.getStorageSync('token'),
      type: 'POST',
      data: cart,
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

  /**
   * 获取我的购物车数量
   */
  getCartCount(callback) {
    var param = {
      url: '/shopping/v1/cart/count',
      token: wx.getStorageSync('token'),
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

  /**
   * 获取当前用户的全部购物车信息
   */
  getAllShoppingCart(callback) {
    var param = {
      url: '/shopping/v1/cart/list',
      token: wx.getStorageSync('token'),
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

  /**
   * 删除指定购物车信息
   */
  deleteShoppingCart(cart, callback) {
    var param = {
      url: '/shopping/v1/cart/delete',
      type: 'DELETE',
      data: cart,
      token: wx.getStorageSync('token'),
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

  /**
   * 获取缓存中的购物车信息
   */
  getCartDataFromLocal() {
    var cartData = wx.getStorageSync(this._storageKeyName);
    if (!cartData) {
      cartData = [];
    }
    return cartData;
  }

  /**
   * 判断所选商品是否存在购物中
   */
  _isHasThatOne(shoppingCartId, cartData) {
    var item,
      result = {
        index: -1
      };
    for (let i = 0; i < cartData.length; i++) {
      item = cartData[i];
      if (item.shoppingCartId == shoppingCartId) {
        result = {
          index: i,
          data: item
        };
        break;
      }
    }
    return result;
  }

  /**
   * 修改购物车商品数量
   */
  _changeCounts(shoppingId, count) {
    var cartData = this.getCartDataFromLocal(),
      hasInfo = this._isHasThatOne(shoppingId, cartData);
    if (hasInfo.index != -1) {
      if (hasInfo.data.goodsNum > 1) {
        cartData[hasInfo.index].goodsNum += count;
      }
    }
    //更新本地缓存
    wx.setStorageSync(this._storageKeyName, cartData);
  }

  /**
   * 增加商品数目
   */
  addCounts(shoppingCartId) {
    this._changeCounts(shoppingCartId, 1);
  }

  /**
   * 购物车减
   */
  cutCounts(shoppingCartId) {
    this._changeCounts(shoppingCartId, -1);
  }

  /**
   * 删除缓存中的购物车信息
   */
  delete(shoppingCartIds) {
    if (!(shoppingCartIds instanceof Array)) {
      ids = [shoppingCartIds];
    }
    var cartData = this.getCartDataFromLocal();
    for (let i = 0; i < shoppingCartIds.length; i++) {
      var hasInfo = this._isHasThatOne(ids[i], cartData);
      if (hasInfo.index != -1) {
        cartData.splice(hasInfo.index, 1); //删除数组某一项
      }
    }
    wx.setStorageSync(this._storageKeyName, cartData);
  }

}
export {
  Cart
};