// components/musiclist/musiclist.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    musicId:1
  },
  pageLifetimes:{
    show(){
      this.setData({
        musicId:app.getPlayMusicId()
      }) 
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event){
      let musicId = event.currentTarget.dataset.musicid;
      let playIndex = event.currentTarget.dataset.index
      this.setData({
        musicId: musicId
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${musicId}&&playIndex=${playIndex}`,
      })
    }
  }
})
