var app = getApp();
Page({
  data: {

  },
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
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: { 'Content-Type':'json'},
      success: function(res){
        console.log(res);
        var movieDatas = res.data.subjects;
        that.processMovieData(movieDatas);
        // that.setData({
        //   movieDetail: movieDatas.subjects
        // })
      },
      fail: function(){
        console.log('fail');
      }
    })
  },
  processMovieData(data){
    var movies=[],temp={};
    for(var idx in data){
      temp = {
        images: data[idx].images.large,
        title: data[idx].title,
        rating: data[idx].rating.average,
        movieId: data[idx].id
      }
      movies.push(temp)
    }
    this.setData({
      movies: movies
    })
  }
})