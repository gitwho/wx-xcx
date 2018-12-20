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
    var post = [
      {
        date: 'sep 18 2016',
        title: '正是虾肥蟹壮时',
        imgSrc: '/images/post/crab.png',
        avatar: '/images/avatar/1.png',
        content: '本文档将带你一步步创建完成一个微信小程序，并可以在手机上体验该小程序的实际效果。这个小程序的首页将会显示欢迎语以及当前用户的微信头像，点击头像',
        reading: '112',
        collection: '96',
        headImgSrc: '/images/post/crab.png',
        author: '李白',
        dataTime: '24time',
        detail: '并可以在手机上体验该小程序的实际效果。',
        postId: 1
      },
      {
        date: 'sep 18 2016',
        title: '正是虾肥蟹壮时',
        imgSrc: '/images/post/crab.png',
        avatar: '/images/avatar/1.png',
        content: '本文档将带你一步步创建完成一个微信小程序，并可以在手机上体验该小程序的实际效果。这个小程序的首页将会显示欢迎语以及当前用户的微信头像，点击头像',
        reading: '112',
        collection: '96',
        headImgSrc: '/images/post/crab.png',
        author: '李白',
        dataTime: '24time',
        detail: '并可以在手机上体验该小程序的实际效果。',
        postId: 1
      }
    ]
    this.setData({
      post_author: post
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
