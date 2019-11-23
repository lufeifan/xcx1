const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: false, //是否全选
    totalPrice: 0, //总价
    model: [],
    isEdit: false
  },
  totalPrice() { //计算总价
    let that = this
    let price = 0
    for (let i = 0; i < that.data.model.length; i++) {
      if (that.data.model[i].select) {
        price = price + that.data.model[i].price
      }
    }
    this.setData({
      totalPrice: price
    })

  },
  totalFun() { //全选
    this.data.total = !this.data.total

    this.data.model.map((v, k) => {
      if (this.data.total) {
        v.select = true
      } else {
        v.select = false
      }
    })
    this.setData({
      model: this.data.model,
      total: this.data.total
    })

    this.totalPrice()
  },
  labelFun(e) { //单选
    let that = this
    let num = 0
    for (let i = 0; i < that.data.model.length; i++) {
      if (that.data.model[i]._id == e.currentTarget.dataset.id) {
        if (!that.data.model[i].select) {
          that.data.model[i].select = true
        } else {
          that.data.model[i].select = !that.data.model[i].select
        }
        that.setData({
          model: that.data.model,
        })
      }

      let sum = 0;
      that.data.model.map((v, k) => {
        if (v.select) {
          sum++;
        }
      })
      if (sum == that.data.model.length) {
        that.data.total = true
      } else {
        that.data.total = false
      }
      that.setData({
        total: that.data.total
      })
      // console.log(that.data.total)
    }
    this.totalPrice()
  },
  editFun() { //编辑
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  delFun() { //选中删除
    let model = []
    this.data.model.map((v, k) => {
      if (!v.select) {
        model.push(v)
      } else {
        wx.request({
          url: 'http://139.155.12.117:3333/api/usercart/' + v._id,
          // url: 'http://localhost:3001/api/usercart/' + v._id,
          method: 'delete',
          success: function(res) {
            console.log(res)
            wx.showToast({
              title: '删除成功',
              icon: 'success',
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
    this.setData({
      model: model,
      total: false
    })
    this.totalPrice()

  },
  closeFun: function() {
    // let model = []
    // let listTotal = []
    // this.data.model.map((v, k) => {
    //   if (v.select) {
    //     model.push(v)
    //   } else {
    //     listTotal.push(v)
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
    wx.request({
      url: 'http://139.155.12.117:3333/api/usercart/' + app.globalData.openid,
      // url: 'http://localhost:3001/api/usercart/' + app.globalData.openid,
      success: (res) => {
        console.log(res.data[0].usercart)
        this.setData({
          model: res.data[0].usercart
        })
      }
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