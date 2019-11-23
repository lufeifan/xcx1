// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model:[],

  },
  wxlogin(e) {
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '提示',
        content: '您已拒绝授权，请点击确定后允许授权',
        success: (res)=> {
          if (res.confirm) {
            this.login()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
         }
      })
      return false
    }
    this.login()
  },
  login(){
    wx.login({

      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          // url: 'http://localhost:3001/api/login/'+res.code,
          url: 'http://139.155.12.117:3333/api/login/' + res.code,
          success: (result) => {
            console.log(result.data);
            app.globalData.openid = result.data.openid;
            app.globalData.userInfo = result.data;
            app.globalData.session_key = result.data.session_key
          }
        })
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
    this.dialog = this.selectComponent("#dialog");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: 'http://139.155.12.117:3333/api/getgoodslist',
      // url: 'http://localhost:3001/api/getgoodslist',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          model: res.data
        })
      }
    })
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

  },
  showDologin: function () {
    this.dialog.showDialog();
  },
  confirmEvent: function () {
    this.dialog.hideDologin();
  },
  bindGetUserInfo: function (e) {
    // 用户点击授权后，这里可以做一些登陆操作 this.login();
    this.wxlogin(e.detail.event)
  },
})