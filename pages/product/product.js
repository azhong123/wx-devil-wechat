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
    indicatorDots: true, //是否显示面板指示点
    autoplay: false, //是否自动切换
    duration: 1000, //  滑动动画时长1s
    id: null,
    imgUrls: [],
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
      this.data.imgUrls = res.mainImgUrls;
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
  },

  /**
   * 图片放大预览
   */
  previewImage: function(res) {
    console.log(res);
    var imgSrc = product.getDataSet(res, "src");
    console.log(imgSrc);
    wx.previewImage({
      current: imgSrc, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  
  /**
   * 选择规格和数量
   */
  toggleDialog: function(res){

  }


})