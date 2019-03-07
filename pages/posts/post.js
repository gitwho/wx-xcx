var postData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.post_author = postData.postList //直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的
    
    this.setData({
      post_author: postData.postList
    });
  },
  onPostTap(event) {
    var postid = event.currentTarget.dataset.postid;
    console.log(postid);
    wx.navigateTo({ // 跳转子页面
      url: 'post-detail/post-detail?id=' + postid,
    })
  },
  onSwiperTap(event) {
    // target: 当前点击的组件 -> image组件； currentTarget: 事件捕获的组件 -> swiper组件
    var postid = event.target.dataset.postid;
    console.log(postid);
    wx.navigateTo({ // 跳转子页面
      url: 'post-detail/post-detail?id=' + postid,
    })
  }
})
