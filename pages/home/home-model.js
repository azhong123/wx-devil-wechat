class Home{
  constructor(){

  }
  
  getBannerData(bannerType){
    wx.request({
      url: 'http://127.0.0.1:8086/api/index/v1/banner/' + bannerType,
      method : 'GET',
      success : function(res){
          console.log(res);
          return res;
      }
    })
  }
}
export {Home};