// components/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modelShow:Boolean
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
    getUserInfo(event){
         let userInfo =event.detail.userInfo
         //说明已经授权了
         if(userInfo){
            this.setData({
              modelShow:false
            })
            this.triggerEvent('loginsuceess',userInfo)
         }else{
           this.triggerEvent("loginfail")
         }
    }
  }
})
