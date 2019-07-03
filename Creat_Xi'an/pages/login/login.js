// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account_value:'',
    password_value:''
  },
  Request_Login:function(e){
    var acc = e.detail.value.account;      //账号
    var pas = e.detail.value.password;     //密码
    console.log(acc + ',' + pas),
    wx.request({
      url: 'https://documenter.getpostman.com/view/6988539/S1a8xPui',   //登录接口
      data: {
        x: acc,
        y: pas
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if(1){
          wx.navigateTo({
            url: '../mySpace/mySpace'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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