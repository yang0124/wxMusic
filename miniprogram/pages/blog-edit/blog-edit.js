// pages/blog-edit/blog-edit.js
let maxLength =140
let maxImage=9
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordsNum:0,
    bottomHeight:0,
    images:[],
    selectphoto:false
  },
  //这是监听输入字体的个数
  onInput(event){
    let wordsNum =event.detail.value.length
    if(wordsNum >= maxLength){
      wordsNum =`最大限制为${wordsNum}`
    }
    this.setData({
      wordsNum
    })
  },
  //这是在获得焦点的时候，得到键盘的高度
  onFocus(event){
      this.setData({
        bottomHeight:event.detail.height
      })
  },
  //这是在失去焦点的时候，还原高度
  onBlur(){
      this.setData({
        bottomHeight:0
      })
  },
  //这是选择图片
  onChooseImg(){
    //还能再选几张图片
    let max = maxImage - this.data.images.length
    wx.chooseImage({
      count:max,
      success:res=>{
        console.log(res)
        this.setData({
          images:this.data.images.concat(res.tempFilePaths)
        })
        //还能再选几张图片
        max = maxImage - this.data.images.length
        if(max<=0){
          this.setData({
            selectphoto:true
          })
        }
      }
    })
  },
  //这是删除图片
  onDelImage(event){
    console.log(event)
    let index =event.target.dataset.index
    this.data.images.splice(index,1)
    this.setData({
      images:this.data.images
    })
    console.log(this.data.images.length)
    if(this.data.images.length==maxImage-1){
      this.setData({
        selectphoto:false
      })
    }
  },
  //这是预览图片的功能
  imagePreview(event){
    console.log(event)
    console.log(this.data.images)
    wx.previewImage({
      urls: this.data.images,
      current:event.target.dataset.imgsrc
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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