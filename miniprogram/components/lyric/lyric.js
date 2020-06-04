// components/lyric/lyric.js
let lyricHeigth =0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyric:Boolean,
    lyric:String
  },
  observers:{
    //这是在判断有无歌词的时候的，操作
      lyric(lrc){
        console.log(lrc)
        if (lrc=="暂无歌词"){
          this.setData({
            nowLyricIndex:-1,
            lrcList:[
              {
                time:'00',
                lrc:"暂无歌词"
              }
            ]
          })
        }else{
          this.parseLyric(lrc)
        }
       
      },
  },
  /**
   * 组件的初始数据
   */
  lifetimes:{
      ready(){
        wx.getSystemInfo({
          success: function(res) { 
            lyricHeigth=res.screenWidth/750 * 64 
          },
        })
      }
  },
  data: {
    lrcList:[],
    nowLyricIndex:0,
    scrollTop:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updata(currentTime){
     
      let lrcList = this.data.lrcList;
      if(lrcList.length==0){
        return
      }
      //这是判断当前时间大于歌词总时间，当最后的不显示
      if (currentTime > lrcList[lrcList.length - 1].time) {
        if (this.data.nowLyricIndex != -1) {
          this.setData({
            nowLyricIndex: -1,
            scrollTop: lrcList.length * lyricHeigth
          })
        }
      }
      //这是在判断如果有歌词，歌词的滚动
      for (let i = 0, len = lrcList.length;i<len;i++){
        if (currentTime <= lrcList[i].time){
            this.setData({
              nowLyricIndex:i - 1,
              scrollTop: (i - 1) * lyricHeigth 
            })
            break
        }
      }
    },
    parseLyric(sLyric){
      let line = sLyric.split("\n")
      let _lrcList=[]
      line.forEach(elem=>{
        let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if(time != null){
          // console.log(time)
          let lrc = elem.split(time)[1]
          let timeReg = time[0].match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/) 
          // console.log(timeReg)
          //把时间转换成为秒
          let time2Seconds = parseInt(timeReg[1])*60 + parseInt(timeReg[2]) +parseInt(timeReg[3])/1000
          _lrcList.push({
            lrc,
            time: time2Seconds
          })
        }
      })
      this.setData({
        lrcList: _lrcList
      })
    }
  }
})
