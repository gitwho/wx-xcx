// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onTap(){ // 进同级页面
    // wx.navigateTo({ // 进子页面，会出现返回箭头
    //   url: '../posts/post',
    // })
    // wx.redirectTo({ 
    //   url: '../posts/post',
    // })
    wx.switchTab({ 
      url: "../posts/post",
    })
  }
  
})