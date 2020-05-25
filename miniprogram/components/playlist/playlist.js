// components/playlist/playlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist:Object
    
  },
  observers:{
    ['playlist.playCount'](count){
      this.setData({
        count:this.transNum(count, 2)
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    count:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toMusiclist(){
      wx.navigateTo({
        url: `../../pages/musiclist/musiclist?playlistId=${this.properties.playlist.id}`,
      })
    },
    transNum(count,point){
      let numStr =count.toString().split('.')[0]
      if(numStr.length<6){
        return numStr
      }else if(numStr.length>=6 && numStr.length<=8){
        let decimal = numStr.slice(numStr.length - 4, numStr.length-4 +point)
        return parseFloat(parseInt(numStr / 10000) + '.' + decimal) +'万'
      }else if(numStr.length >8){
        let decimal =numStr.slice(numStr.length-8,numStr.length-8 +point)
        return parseFloat(parseInt(numStr / 100000000) + '.' + decimal) + '亿'
      }
    }
  }
})
