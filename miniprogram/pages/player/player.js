// pages/player/player.js
let playerList=[]//这是拿到歌曲的信息
let playIndex=0 //这是拿到当前播放的信息
//获取全局唯一的音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl:"",
    isPlay:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    playerList = wx.getStorageSync('musiclist')
    playIndex = parseInt(options.playIndex) 
    console.log(options.musicId)
    this.loadmusicList(options.musicId)
  },

  loadmusicList(musicId){
    let music = playerList[playIndex]
    console.log(music)
   wx.setNavigationBarTitle({
     title: music.name ,
   })
   this.setData({
     picUrl: music.al.picUrl
   })
   wx.showLoading({
     title: '歌曲正在加载中',
   })
   wx.cloud.callFunction({
     name:"music",
     data:{
       musicId,
       $url:'player'
     }
   }).then(res => {
     let result = res.result.data[0]
     backgroundAudioManager.src = result.url
     backgroundAudioManager.title = music.name
      backgroundAudioManager.coverImgUrl = music.al.picUrl
      backgroundAudioManager.singer =music.ar[0].name
      wx.hideLoading()
      this.setData({
        isPlay:true
      })
   })
  },
  toTogglePlay(){
    //说明正在播放
    if (this.data.isPlay){
        backgroundAudioManager.pause()
    }else{
        backgroundAudioManager.play()
    }
    this.setData({
      isPlay:!this.data.isPlay
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