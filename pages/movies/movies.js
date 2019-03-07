var util = require('../../utils/util.js')

var app = getApp();
Page({
  data: {
    hotMovies: {},
    comingMovies: {},
    top250: {}
  },
  onLoad:function(){
    
    var baseUrl = app.globalData.doubanBase
    var hotMoviesUrl = baseUrl + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingMoviesUrl = baseUrl + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = baseUrl +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMoviesData(hotMoviesUrl, 'hotMovies');
    this.getMoviesData(comingMoviesUrl, 'comingMovies');
    this.getMoviesData(top250Url, 'top250');

  },
  getMoviesData: function(url, type) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: { 'Content-Type':'json'},
      success: function(res){
        console.log(res);
        var movieDatas = res.data.subjects;
        that.processMovieData(movieDatas, type);
        // that.setData({
        //   movieDetail: movieDatas.subjects
        // })
      },
      fail: function(){
        console.log('fail');
      }
    })
  },
  processMovieData(data, type){
    var movies=[],temp={};
    for(var idx in data){
      var item = data[idx];
      var title = item.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      temp = {
        coverUrl: item.images.large,
        title: title,
        rating: item.rating.average,
        movieId: item.id
      }
      movies.push(temp)
    }
    var allMovies = {};
    allMovies[type] = {
      movies: movies
    };
    this.setData(allMovies);
  }
})