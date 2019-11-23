const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    id: '',
    state: null,
    flag: true,
    deletetime: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  defaultFun: function(data) {
    let that = this
    console.log(data.currentTarget.dataset.time)
    for (let i = 0; i < that.data.list.length; i++) {
      if (that.data.list[i].time == data.currentTarget.dataset.time) {
        if (that.data.list[i].select) {
          that.data.list[i].select = !that.data.list[i].select
        } else {
          that.data.list[i].select = !that.data.list[i].select
        }
      }
    }
    let sum = 0;
    that.data.list.map((v, k) => {
      if (v.select) {
        sum++;
      }
    })
    if (sum == 0) {
      that.data.flag = true
    } else {
      that.data.flag = false
    }
    that.setData({
      list: that.data.list,
      flag: that.data.flag,
      deletetime: data.currentTarget.dataset.time
    })
  },
  deleteaddress() {
    let list = []
    this.data.list.map((v, k) => {
      if (!v.select) {
        list.push(v)
      } else {
        wx.request({
          url: 'http://139.155.12.117:3333/api/useraddress/' + v.time,
          // url: 'http://localhost:3001/api/useraddress/' + v.time,getgoodslist
          method: 'delete',
          success: function (res) {
            console.log(res)
            wx.showToast({
              title: '删除成功',
              icon: 'success',
            })
          },
        })
      }
    })
    this.setData({
      list: list,
      flag:true
    })
  },
  onLoad: function(options) {

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
    let that = this
    wx.request({
      url: 'http://139.155.12.117:3333/api/useraddress/' + app.globalData.openid,
      // url: 'http://localhost:3001/api/useraddress/' + app.globalData.openid,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log(res.data[0].address)
        that.setData({
          list: res.data[0].address
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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