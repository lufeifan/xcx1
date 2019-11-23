Component({
  options: {
    mutipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //弹窗标题
    title: {
      type: String,
      value: '标题' //默认值
    },
    //弹窗内容
    content: {
      type: String,
      value: '弹窗内容'
    },
    //弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //弹窗显示控制
    isShow: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹窗
    hideDologin() {
      this.setData({
        isShow: false
      })
    },
    //展示弹窗
    showDologin() {
      this.setData({
        isShow: true
      })
    },
    /*
  *triggerEvent组件之间通信
  */
    confirmEvent() {
      this.triggerEvent("confirmEvent");
    },
    bindGetUserInfo(e) {
      this.triggerEvent("bindGetUserInfo", { event: e });
    }
  },
})