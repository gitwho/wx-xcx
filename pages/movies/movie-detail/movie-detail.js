var util = require('../../../utils/util.js');
var postsData = require('../../../data/posts-data.js');
// 获取全局对象
var app = getApp();

Page({
  data: {

  },
  onLoad: function (options) {
    var movieid = options.movieid;
    var detailUrl = app.globalData.doubanBase + '/v2/movie/subject/' + movieid;
    util.http(detailUrl, this.getMovieData);
  },
  getMovieData: function (res) {
    console.log(res);
  }
})