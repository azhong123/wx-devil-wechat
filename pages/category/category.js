// pages/category/category.js
import {
  Category
} from 'category-model.js';
var category = new Category();
var categoryTypeArr = [];
var currentMenuIndex = null;
var categoryProducts = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenuIndex: 0,
    categoryTypeArr: [],
    categoryProducts: null,
    loadedData: {}
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
  onShow: function(option) {
    category.hideLoading();
  },

  /**
   * 加载分类数据
   */
  _loadData: function() {
    category.getCategoryType((categoryData) => {
      this.setData({
        categoryTypeArr: categoryData,
      });

      // 默认加载第一个分类商品数据
      category.getProductsByCategory(categoryData[0].cateId, (res) => {
        categoryProducts = {
          procucts: res,
          topImgUrl: categoryData[0].topicImgUrl,
          title: categoryData[0].name
        };
        this.setData({
          categoryProducts: categoryProducts,
        });
        this.data.loadedData[0] = categoryProducts;
      });
    });
  },

  /**
   * 加载 分类商品数据
   */
  changeCategory: function(res) {
    var index = category.getDataSet(res, 'index'),
      cateId = category.getDataSet(res, 'cateid')
    this.setData({
      currentMenuIndex: index
    });
    if (!this.isLoadedData(index)) {
      /**
       * 添加分类下的商品
       */
      category.getProductsByCategory(cateId, (data) => {
        categoryProducts = {
          procucts: data,
          topImgUrl: this.data.categoryTypeArr[index].topicImgUrl,
          title: this.data.categoryTypeArr[index].name
        };
        this.setData({
          categoryProducts: categoryProducts
        });
        this.data.loadedData[index] = categoryProducts;
      });
    } else {
      this.setData({
        categoryProducts: this.data.loadedData[index]
      });
    }
  },

  /**
   * 判断分类及分类商品是否加载过
   */
  isLoadedData: function(index) {
    if (this.data.loadedData[index]) {
      return true;
    }
    return false;
  },

  /**
   * 跳转 商品详情页
   */
  onProductsItemTap: function(event) {
    var id = category.getDataSet(event, "id");
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  }
})