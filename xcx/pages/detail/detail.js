const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tabIs: true,
    specIs: false,
    data: null
  },
  tabFun(e) {
    // console.log(e)
    if (e.currentTarget.dataset.state == 1) {
      this.setData({
        tabIs: true
      })
    } else {
      this.setData({
        tabIs: false
      })
    }
  },
  goShopCar: function() {
    wx.reLaunch({
      url: "/pages/cart/cart"
    });
  },
  specFun() {
    this.setData({
      specIs: !this.data.specIs
    })
  },
  addCart() {
    let that=this
    wx.request({
      url: 'http://139.155.12.117:3333/api/usercart/' + that.data.model._id,
      // url: 'http://localhost:3001/api/usercart/' + that.data.model._id,
      data:{
        openid:app.globalData.openid,
      },
      method: 'post',
      success: (res) => {
        console.log(res.data)
        // that.setData({
        //   model: res.data
        // })
        wx.showToast({
          title: '添加成功',
          icon: 'success',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    let that = this
    wx.request({
      url: 'http://139.155.12.117:3333/api/getgoodslist/' + options.id,
      // url: 'http://localhost:3001/api/getgoodslist/' + options.id,
      success: (res) => {
        console.log(res.data)
        that.setData({
          model: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})