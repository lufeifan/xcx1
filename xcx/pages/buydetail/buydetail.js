
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    address: null,
    data: null,
    totalPrice:0
  },
  tip(){
    wx.showToast({
      title: '尚未支持支付功能',
      icon: 'none',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    wx.request({
      url: 'http://139.155.12.117:3333/api/getgoodslist/' + options.id,
      // url: 'http://localhost:3001/api/getgoodslist/' + options.id,
      success: (res) => {
        console.log(res.data)
        this.data.totalPrice = res.data.price + res.data.freight
        this.setData({
          list: res.data,
          totalPrice: this.data.totalPrice
        })
      }
    })
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
    wx.request({
      url: 'http://139.155.12.117:3333/api/useraddress/' + app.globalData.openid,
      // url: 'http://localhost:3001/api/useraddress/' + app.globalData.openid,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        this.setData({
          address: res.data[0].address[0]
        })
      },
      fail: function (res) { },
      complete: function (res) { },
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

  }
})