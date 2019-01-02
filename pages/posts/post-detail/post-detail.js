var postsData = require('../../../data/posts-data.js')

Page({
  onLoad: function(option) {
    var postid = option.id;
    var postData = postsData.postList[postid];
    this.setData({
      postData: postData
    })
  }
})