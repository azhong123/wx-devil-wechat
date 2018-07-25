// pages/product/product.js
import {
  Product
} from 'product-model.js';
import {
  Cart
} from '../cart/cart-model.js';
var product = new Product();
var cart = new Cart();

var goodsId = null;
var goods = null;
var imgUrls = [];
var detailImg = [];
var paramItems = [];
var currentTabsIndex = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike: false,
    showDialog: false,
    goods: null,
    detailImg: {},
    paramItems: {},
    currentTabsIndex: 0,
    indicatorDots: true, //是否显示面板指示点
    autoplay: false, //是否自动切换
    duration: 1000, //  滑动动画时长1s
    id: null,
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
      this.data.imgUrls = res.mainImgUrls;
      goods = {
        count: 1,
        goodsId: res.goodsId,
        goodsName: res.goodsName,
        goodsPrice: res.goodsPrice,
        goodsMinImg: res.goodsMinImg,
        mainImgUrls: this.data.imgUrls,
        totalMoney: res.goodsPrice,
      }
      this.setData({
        goods: goods,
      });
    });

    /**
     * 获取商品详情图片
     */
    product.getGoodsDetailImg(this.data.id, (res) => {
      this.data.goods.detailImg = res;
      this.setData({
        goods: this.data.goods,
      });
    });

    /**
     * 获取商品详情参数
     */
    product.getGoodsParamItems(this.data.id, (res) => {
      this.data.goods.paramItems = res;
      this.setData({
        goods: this.data.goods,
      });
    });
  },

  /**
   * 图片放大预览
   */
  previewImage: function(res) {
    var imgSrc = product.getDataSet(res, "src");
    console.log(imgSrc);
    wx.previewImage({
      current: imgSrc, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },

  /**
   * sku 弹出
   */
  toggleDialog: function() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**
   * sku 关闭
   */
  closeDialog: function() {
    this.setData({
      showDialog: false
    });
  },

  /* 减数 */
  delCount: function(e) {
    var count = this.data.goods.count;
    if (count > 1) {
      this.data.goods.count--;
    }
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },

  /* 加数 */
  addCount: function(e) {
    var count = this.data.goods.count;
    if (count < 100) {
      this.data.goods.count++;
    }
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  //价格计算
  priceCount: function(e) {
    this.data.goods.totalMoney = this.data.goods.goodsPrice * this.data.goods.count;
    this.setData({
      goods: this.data.goods
    })
  },

  /**
   * 商品详情选择
   */
  onTabsItemTap: function(res) {
    this.data.currentTabsIndex = product.getDataSet(res, "index");
    this.setData({
      currentTabsIndex: this.data.currentTabsIndex
    })
  },

  /**
   * 加入购物车
   */
  addToCart: function() {
    var goods = this.data.goods;
    var cartObj = {
      isChecked: 1,
      goodsNum: goods.count,
      goodsPrice: goods.totalMoney,
      goodsId: goods.goodsId
    }
    try {
      wx.setStorageSync('token', 'eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqViouTVKyUjK0MDUwNDe0NDE00o0O8vdxjXd08fX001EAs0ODXYNilXSUMhNLlKwMTY2NTI2MjU0MgQIpQL6OUl5ibiqqIUDFqRUFYMXGhkYWhiaGtQAAAAD__w.0vxt4hL0GHWJrgQt-gXvCY2cnyloQTgl9ruu3ad29l4')
    } catch (e) {
      console.log(e)
    }
    cart.addCart(cartObj, (res) => {
      console.log(res)
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 1500,
      });
      this.closeDialog();
    });
  }
})