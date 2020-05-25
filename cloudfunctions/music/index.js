// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
cloud.init()
const db = cloud.database()
let rp = require('request-promise')
const BASE_URL= "http://musicapi.xiecheng.live"
// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  app.router('playlist',async (ctx,next)=>{
    ctx.body = await db.collection("playlist")
              .skip(event.start)
              .limit(event.count)
              .orderBy('creatTime', 'desc')
              .get()
              .then(res => {
                    return res.data
              })
  })
 
 app.router("musiclist", async (ctx,next)=>{
    ctx.body = await rp(BASE_URL+'/playlist/detail?id='+parseInt(event.playlistId)).then(res=>{
      return JSON.parse(res)
    })
 })
 return app.serve()
}