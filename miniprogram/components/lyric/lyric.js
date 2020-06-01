// components/lyric/lyric.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lyric:String
  },
  observers:{
      lyric(lrc){
        this.parseLyric(lrc)
      },
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    parseLyric(sLyric){
      let line = sLyric.split("\n")
      console.log(line)
      line.forEach(elem=>{
        let time = elem.math(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
      })
    }
  }
})
