// miniprogram/pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelShow:false
  },
  onPublish(){
    //这是获得用户的授权信息
     wx.getSetting({
      success:res=>{
        if(res.authSetting["scope.userInfo"]){
          wx.getUserInfo({
            success: (res) => {
              this.loginsuceess({
                detail:res.userInfo
              })
            },
          })
        }else{
          this.setData({
            modelShow:true
          })
        }
      }
     })
  },
  loginsuceess(event){
    console.log(event)
    let detail =event.detail
    wx.navigateTo({
      url: `../blog-edit/blog-edit?avatarUrl=${detail.avatarUrl}&&nickName=${detail.nickName}`,
    })
  },
  loginfail(){
      wx.showModal({
        title:'只有授权才能发布'
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