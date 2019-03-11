var util = require('../../utils/util.js')

var app = getApp();
Page({
  data: {
    hotMovies: {},
    comingMovies: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false
  },
  onLoad:function(){
    
    var baseUrl = app.globalData.doubanBase
    var hotMoviesUrl = baseUrl + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingMoviesUrl = baseUrl + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = baseUrl +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMoviesData(hotMoviesUrl, 'hotMovies', "正在热映");
    this.getMoviesData(comingMoviesUrl, 'comingMovies', "即将上映");
    this.getMoviesData(top250Url, 'top250', "top250");

  },
  getMoviesData: function(url, type, categoryTit) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: { 'Content-Type':'json'},
      success: function(res){
        console.log(res);
        var movieDatas = res.data.subjects;
        that.processMovieData(movieDatas, type, categoryTit);
        // that.setData({
        //   movieDetail: movieDatas.subjects
        // })
      },
      fail: function(){
        console.log('fail');
      }
    })
  },
  processMovieData: function(data, type, categoryTit){
    var movies=[],temp={};
    for(var idx in data){
      var item = data[idx];
      var title = item.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      temp = {
        categoryTit: categoryTit,
        stars: util.convertToStarsArray(item.rating.stars),
        coverUrl: item.images.large,
        title: title,
        rating: item.rating.average,
        movieId: item.id
      }
      movies.push(temp)
    }
    var allMovies = {};
    allMovies[type] = {
      movies: movies,
      categoryTit: categoryTit
    };
    this.setData(allMovies);
  },
  onMore: function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onBindFocus: function (event) {
    console.log('ww');
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  onBindChage: function(event){

  },
  onCancelImgTap: function(event){
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  }
})