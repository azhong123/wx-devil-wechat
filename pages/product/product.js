// pages/product/product.js
import {
  Product
} from 'product-model.js';
var product = new Product;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.id = options.id;
    this._loadData();
  },

  _loadData: function() {
    /**
     * 获取商品详情信息
     */
    product.getGoodsDetail(this.data.id, (res) => {
      console.log(res);
      this.setData({
        'productDetail': res
      });
    });

    /**
     * 获取商品详情图片
     */
    product.getGoodsDetailImg(this.data.id, (res) => {
      console.log(res);
      this.setData({
        'productImgs': res
      });
    });

    /**
     * 获取商品详情参数
     */
    product.getGoodsParamItems(this.data.id, (res) => {
      console.log(res);
      this.setData({
        'productParamItems': res
      });
    });
  }


})