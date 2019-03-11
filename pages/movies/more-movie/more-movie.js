// pages/movies/more-movie/more-movie.js
var util = require("../../../utils/util.js");

var app = getApp();
Page({
  data: {
    movies: '',
    navigateTitle:"",
    loadUrl: '',
    totalCount: 0,
    isEmpty: true
  },
  onLoad: function (options) {
    var category = options.category;
    var baseUrl = app.globalData.doubanBase, dataUrl="";

    this.data.navigateTitle = category;
    switch (category) {
      case "正在热映" : 
        dataUrl = baseUrl + "/v2/movie/in_theaters";
      break;
      case "即将上映" : 
        dataUrl = baseUrl + "/v2/movie/coming_soon";
      break;
      case "tophot" : 
        dataUrl = baseUrl + "/v2/movie/top250";
      break;
    };
    util.http(dataUrl, this.processMovieData);
    this.data.loadUrl = dataUrl;
  },
  getMore: function (event) {
    var nextUrl = this.data.loadUrl +"?start="+this.data.totalCount+"&count=10";
    util.http(nextUrl, this.processMovieData);
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh: function(event){
    var refreshUrl = this.data.loadUrl + "?start=0&count=20";
    this.data.movies=[];
    this.data.isEmpty=true;
    util.http(refreshUrl, this.processMovieData);
    wx.showNavigationBarLoading();
  },
  processMovieData: function (res) {
    var data = res.subjects;
    var movies = [], temp = {};
    for (var idx in data) {
      var item = data[idx];
      var title = item.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      temp = {
        stars: util.convertToStarsArray(item.rating.stars),
        coverUrl: item.images.large,
        title: title,
        rating: item.rating.average,
        movieId: item.id
      }
      movies.push(temp);
    }
    var totalMovies = {};

    if (!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    
    this.setData({
      movies: totalMovies
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    this.data.totalCount += 10;
  },
  onReady: function(){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }
  
})