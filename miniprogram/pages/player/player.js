// pages/player/player.js
let playerList=[]//这是拿到歌曲的信息
let playIndex=0 //这是拿到当前播放的信息
//获取全局唯一的音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl:"",
    isPlay:false,
    isLyric:false,
    lyric:"",
    isSame:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    playerList = wx.getStorageSync('musiclist')
   
    playIndex = parseInt(options.playIndex) 
 
    this.loadmusicList(options.musicId)
  },

  loadmusicList(musicId){
    if(musicId == app.getPlayMusicId()){
      this.setData({
        isSame:true
      })
    }else{
      this.setData({
        isSame:false
      })
       //停止当前播放的歌曲
    backgroundAudioManager.stop()
    }

   
    //这是得到当前播放的歌曲的信息
    let music = playerList[playIndex]
   //这是设置歌曲的标题
   wx.setNavigationBarTitle({
     title: music.name ,
   })
    //这是得到背景图片的设置
   this.setData({
     picUrl: music.al.picUrl
   })
   wx.showLoading({
     title: '歌曲正在加载中',
   })
   app.setPlayMusicId(musicId)
   //这是调用云函数，得到歌曲的相关信息
   wx.cloud.callFunction({
     name:"music",
     data:{
       musicId,
       $url:'player'
     }
   }).then(res => {
     let result = res.result.data[0]
     if(!this.data.isSame){
        backgroundAudioManager.src = result.url
        backgroundAudioManager.title = music.name
       backgroundAudioManager.coverImgUrl = music.al.picUrl
       backgroundAudioManager.singer =music.ar[0].name
     }
    
      wx.hideLoading()
      this.setData({
        isPlay:true
      })
   }),
   //这是调用云函数，得到歌词相关的内容
   wx.cloud.callFunction({
     name:"music",
     data:{
       musicId,
       $url:"lyric"
     }
   }).then(res => {
    
     let lyric="暂无歌词";
     if (res.result.lrc.lyric){
       lyric=res.result.lrc.lyric
       console.log(11111)
     }
     this.setData({
       lyric
     })
   })

  },
  //这是播放按键的切换功能
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
  //点击播放上一首歌
  onPrev(){
    playIndex--
    if (playIndex<0){
      playIndex = playerList.length -1
    }
    console.log(playIndex)
    this.loadmusicList(playerList[playIndex].id)
  },
  onNext(){
    playIndex++
    if (playIndex == playerList.length ){
      playIndex=0
    }
    console.log(playIndex)
    this.loadmusicList(playerList[playIndex].id)
  },
  //这是改变歌曲的显示和隐藏
  onChangeLyric(){
    this.setData({
      isLyric:!this.data.isLyric
    })
  },
  //这是进度条的当前时间传递到歌曲组件中
  timeUpdata(event){
    this.selectComponent("#lyric").updata(event.detail.currentTime)
    // console.log("111")
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