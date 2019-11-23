const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广西壮族自治区', '柳州市', '城中区'],
    customItem: '全部',
    who: '',
    tel: '',
    detail: '',
    time:'',
    addressIs: true,
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 获取输入框的值
  bindKeyName: function(e) {
    this.setData({
      who: e.detail.value
    })
  },
  bindKeyMobile: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  bindKeyDetailed: function(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  // 提交
  submitFun: function() {
    if (this.data.addressIs) { //添加
      wx.request({
        url: 'http://139.155.12.117:3333/api/useraddress/' + app.globalData.openid,
        // url: 'http://localhost:3001/api/useraddress/' + app.globalData.openid,

        data: {
          who: this.data.who,
          tel: this.data.tel,
          where: this.data.region,
          detail: this.data.detail
        },
        method: 'POST',
        success: (res) => {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
          })
          console.log(res)
        },
      })
    } else {// 编辑
      wx.request({
        url: 'http://139.155.12.117:3333/api/useraddress/' + this.data.time,
        // url: 'http://localhost:3001/api/useraddress/' + this.data.time,
        data: {
          who: this.data.who,
          tel: this.data.tel,
          where: this.data.region,
          detail: this.data.detail
        },
        method: 'put',
        success: (res) => {
          console.log(res.data)
          wx.showToast({
            title: '修改成功',
            icon: 'success',
          })
        },
      })
    }
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.time) {
      this.setData({
        region: options.where.split(','),
        who: options.who,
        tel: options.tel,
        detail: options.detail,
        addressIs: false,
        time:options.time
      })
    }
    console.log(options.time)
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