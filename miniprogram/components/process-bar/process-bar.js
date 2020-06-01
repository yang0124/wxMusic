// components/process-bar/process-bar.js
let movableAreaDis =0;
let movableViewDis =0;
const backgroundAudioManager =wx.getBackgroundAudioManager()
let currentSec = -1 // 这是得到唯一的时间
let duration = 0; //这是表示过去以秒为单位的歌曲总时长
let isMoving =false  //表示当前进度条是否在拖拽
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes: {
    ready(){
      this.getMovableDis(),
      this.bindBGM()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    showTime:{
      currentTime:"00:00",
      totalTime:"00:00"
    },
    movableDis:"",
    progress:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
      if(event.detail.source =="touch"){
        this.data.progress = event.detail.x / (movableAreaDis - movableViewDis) *100
        this.data.movableDis = event.detail.x
        isMoving = true
      }
    },
    onTouchend(){
      let currentTimeFtm = this.dataForm(Math.floor(backgroundAudioManager.currentTime))
      this.setData({
        progress:this.data.progress,
        movableDis:this.data.movableDis,
        ["showTime.currentTime"]: `${currentTimeFtm.min}:${currentTimeFtm.secn}`
      })
      backgroundAudioManager.seek(duration*this.data.progress/100)
      isMoving =false
    },
    getMovableDis(){
      const query = this.createSelectorQuery()
      query.select(".movable-area").boundingClientRect()
      query.select(".movable-view").boundingClientRect()
      query.exec((rect)=>{
        movableAreaDis=rect[0].width;
        movableViewDis=rect[1].width;
      })
    },
    
    bindBGM(){
      backgroundAudioManager.onPlay(()=>{
        isMoving = false
      })
      backgroundAudioManager.onPause(()=>{
        console.log("onPause")
      })
      backgroundAudioManager.onWaiting(()=>{

      })
      backgroundAudioManager.onCanplay(()=>{
        let duration = backgroundAudioManager.duration
        if (duration===undefined){
         setTimeout(()=>{
            this.setTime()
         },1000)
        }else{
          this.setTime()
        }
      })
      //这是在播放期间的操作
      backgroundAudioManager.onTimeUpdate(()=>{
        if(!isMoving){
          let currentTime = backgroundAudioManager.currentTime //这是当前播放的时间
          duration = backgroundAudioManager.duration //这是播放的总时间
          let currentFtm = this.dataForm(currentTime)
          let sec = currentTime.toString().split(".")[0]
          if (sec != currentSec) {
            this.setData({
              movableDis: (movableAreaDis - movableViewDis) * currentTime / duration,
              progress: currentTime / duration * 100,
              ["showTime.currentTime"]: `${currentFtm.min}:${currentFtm.secn}`
            })
            currentSec = sec
          }
        }
      
      })
      backgroundAudioManager.onEnded(()=>{
        //这是微信之间的子父通信
          this.triggerEvent("NextMusic")
      })

    },
    setTime(){
      duration = backgroundAudioManager.duration;
      const dataFtm=this.dataForm(duration)
      console.log(dataFtm)
      this.setData({
        ["showTime.totalTime"]: `${dataFtm.min}:${dataFtm.secn}`
      })
    },
  //格式化时间
    dataForm(sec){
      const min = Math.floor(sec/60)
      const secn = Math.floor(sec%60)
      return {
        "min": this.parse0(min),
        "secn": this.parse0(secn)
      }
    },
    //取零的操作,
    parse0(num){
        return num<10?"0"+num:num
    }
  }
})
