var postsData = require('../../../data/posts-data.js')

Page({
  data: {

  },
  onLoad: function(option) {
    var postid = option.id;
    this.data.currentId = postid;
    var postData = postsData.postList[postid];
    this.setData({
      postData: postData
    });

    var postsCollected = wx.getStorageSync('posts_collected')
    if(postsCollected) {
      var postCollected = postsCollected[postid]
      this.setData({
        collected: postCollected
      })
    }else{
      var postsCollected = {}
      postsCollected[postid] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }

  },
  onCollectionTap: function(event){
    var postsCollected = wx.getStorageSync('posts_collected');
    // 获取当前id的收藏值
    var postCollected = postsCollected[this.data.currentId];
    // 更新值
    postCollected = !postCollected;
    // 更改变量值
    postsCollected[this.data.currentId] = postCollected;
   
    // this.showToast();
    this.showModal(postsCollected, postCollected);
  },
  onShareTap: function(event) {
    
  },

  showToast: function() {
    // 更新缓存值
    wx.setStorageSync('posts_collected', postsCollected);

    // 更新收藏状态图片值
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: 'success'
    })
  },
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '确定吗？',
      content: '你确定要吗',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#781298',
      confirmText: '确定',
      confirmColor: '#3cc51f',
      success: function(res){
        if (res.confirm){
          wx.setStorageSync('posts_collected', postsCollected);
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  }
})