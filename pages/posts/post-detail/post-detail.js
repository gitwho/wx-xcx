var postsData = require('../../../data/posts-data.js');
// 获取全局对象
var app = getApp();
Page({
  data: {
    isPlaying: false
  },
  onLoad: function(option) {
    var postid = option.id;
    // 当前页面id
    this.data.currentId = postid;
    var postData = postsData.postList[postid];
    // 数据
    this.setData({
      postData: postData
    });
    

    var postsCollected = wx.getStorageSync('posts_collected')
    if(postsCollected) {
      var postCollected = postsCollected[postid];
      // postCollected是否存在
      if(!!postCollected){
        this.setData({
          collected: postCollected
        })
      }else{
        this.setData({
          collected: false
        })
      }
      
    }else{
      var postsCollected = {}
      postsCollected[postid] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }

    // 音乐播放图标, 是否是播放状态 及 是否当前页面
    if (app.globalData.g_isPlaying && app.globalData.g_curMusicId === this.data.currentId){
      this.setData({
        isPlaying: true
      })
    }

    // 监听音乐
    this.setAudioMonitor();
  },
  setAudioMonitor: function(){
    var that = this;
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onPlay(function () {
      that.setData({
        isPlaying: true
      })
      // 更改全局变量
      app.globalData.g_isPlaying = true;
      // 当前music id
      app.globalData.g_curMusicId = that.data.currentId;
    })
    backgroundAudioManager.onPause(function () {
      that.setData({
        isPlaying: false
      })
      app.globalData.g_isPlaying = false;
      // 清空当前music id
      app.globalData.g_curMusicId = null; 
    });
    wx.onBackgroundAudioStop(function(){
      that.setData({
        isPlaying: false
      })
      app.globalData.g_isPlaying = false;
      // 清空当前music id
      app.globalData.g_curMusicId = null; 
    })
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
    var itemList = [
      '微信',
      '朋友圈',
      'QQ',
      '微博'
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#333',
      success: function(res){
        console.log(res);
        wx.showModal({
          title: '分享到'+itemList[res.tapIndex]
          // content: '用户是否取消？',
        })
      }
    })
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
  },
// 音乐播放
  onMusicTap: function(event){
    var isPlaying = this.data.isPlaying;
    var currentId = this.data.currentId;
    var postData = postsData.postList[currentId];

    var backgroundAudioManager = wx.getBackgroundAudioManager();
    if(isPlaying) {
      backgroundAudioManager.pause();
      this.setData({
        isPlaying: false
      })
      // this.data.isPlaying = false
    }else {
      console.log(backgroundAudioManager);
      backgroundAudioManager.title = postData.music.title;
      backgroundAudioManager.singer = postData.music.name;
      backgroundAudioManager.coverImgUrl = postData.music.coverImg;
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = postData.music.url;

       this.setData({
        isPlaying: true
      })
    }
    
  }
})