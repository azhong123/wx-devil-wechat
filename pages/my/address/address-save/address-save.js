// pages/my/address/address-save/address-save.js
import {
  AddressSave
} from '../address-save/address-save-model.js';

import {
  Util
} from '../../../../utils/util.js';

var util = new Util();
var addresssave = new AddressSave();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList: [],
    addressData: {},

    showArea: false,
    currentTab: 1,
    country: [],
    residecity: [],
    resideprovince: [],

    curr_pro: '',
    curr_cit: '',
    curr_cou: '',

    // text:"这是一个页面"
    array: ["中国", "美国", "巴西", "日本"],
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    index: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadDate();
  },

  /**
   * 加载数据
   */
  _loadDate: function() {

    /**
     * 获取城市地址列表
     */
    addresssave.getChinaCitys((res) => {
      this.data.cityList = res
      this.setData({
        cityList: this.data.cityList
      })
    });

  },

  formSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;
    console.log(formData)
  },
  formReset: function() {
    console.log('form发生了reset事件');
    this.modalTap2();
  },


  /**
   * 保存收货地址
   */
  formSubmit: function(e) {
    var params = e.detail.value;
    var mobile = params.phone;
    var username = params.name;
    var addressHouse = params.address;
    // 验证用户名和手机号
    if (util.checkUserName(username) && util.checkMobile(mobile)) {
      var saveAddressObj = {
        customerName: username,
        customerMobile: mobile,
        addressProvince: this.data.addressData.resideprovince,
        addressCity: this.data.addressData.residecity,
        addressCountry: this.data.addressData.country,
        addressHouse: addressHouse,
      }
      addresssave.saveAddress(saveAddressObj);
    }
  },


  /**
   * 选择地址列表
   */
  choosearea: function() {
    let result = this.data.addressData;
    var currentTab = 1;
    if (result.country) {
      currentTab = 3;
    } else if (result.residecity) {
      currentTab = 3;
    } else if (result.resideprovince) {
      currentTab = 1;
    } else {
      currentTab = 1;
    }

    let resideprovince = [];
    let residecity = [];
    let country = [];

    this.data.cityList.forEach((item) => {
      resideprovince.push({
        name: item.name
      });
      if (item.name == result.resideprovince) {
        item.city.forEach((item) => {
          residecity.push({
            name: item.name
          });
          if (item.name == result.residecity) {
            item.area.forEach((item) => {
              country.push({
                name: item.name
              });
            });
          }
        });
      }
    });

    this.setData({
      showArea: true,
      resideprovince: resideprovince,
      residecity: residecity,
      country: country,
      // cityList: res,

      currentTab: currentTab,
      curr_pro: result.resideprovince || '请选择',
      curr_cit: result.residecity || '请选择',
      curr_cou: result.country || '请选择',
    });
  },
  areaClose: function() {
    this.setData({
      showArea: false
    });
  },
  //点击省选项卡
  resideprovince: function(e) {
    this.setData({
      currentTab: 1
    });
  },
  //点击市选项卡
  residecity: function() {
    this.setData({
      currentTab: 2
    });
  },
  country: function() {
    this.setData({
      currentTab: 3
    });
  },
  //点击选择省
  selectResideprovince: function(e) {
    let residecity = [];
    let country = [];
    let name = e.currentTarget.dataset.itemName;

    this.data.cityList.forEach((item) => {
      if (item.name == name) {
        item.city.forEach((item, index) => {
          residecity.push({
            name: item.name
          });
          if (index == 0) {
            item.area.forEach((item) => {
              country.push({
                name: item.name
              });
            });
          }
        });
      }
    });

    this.setData({
      currentTab: 2,
      residecity: residecity,
      country: country,
      curr_pro: e.currentTarget.dataset.itemName,
      curr_cit: '请选择',
      curr_cou: '',
    });
  },
  //点击选择市
  selectResidecity: function(e) {
    let country = [];
    let name = e.currentTarget.dataset.itemName;
    this.data.cityList.forEach((item) => {
      if (item.name == this.data.curr_pro) {
        item.city.forEach((item, index) => {
          if (item.name == name) {
            item.area.forEach((item) => {
              country.push({
                name: item.name
              });
            });
          }
        });
      }
    });

    this.setData({
      currentTab: 3,
      country: country,
      curr_cit: e.currentTarget.dataset.itemName,
      curr_cou: '请选择',
    });
  },
  //点击选择区
  selectCountry: function(e) {
    this.data.curr_cou = e.currentTarget.dataset.itemName;

    this.data.addressData.resideprovince = this.data.curr_pro;
    this.data.addressData.residecity = this.data.curr_cit;
    this.data.addressData.country = this.data.curr_cou;
    this.setData({
      showArea: false,
      curr_cou: this.data.curr_cou,
      addressData: this.data.addressData
    });
  },
  // 滑动切换tab
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current + 1
    });
  }
})