var app = getApp();
Page({
  onLoad:function(){
    
    var baseUrl = app.globalData.doubanBase
    var hotMoviesUrl = baseUrl + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingMoviesUrl = baseUrl + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = baseUrl +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMoviesData(hotMoviesUrl);
    this.getMoviesData(comingMoviesUrl);
    this.getMoviesData(top250Url);

  },
  getMoviesData: function(url) {
    wx.request({
      url: url,
      method: 'GET',
      header: { 'Content-Type':'json'},
      success: function(res){
        console.log(res)
        
      },
      fail: function(){
        console.log('fail');
      }
    })
  }
})