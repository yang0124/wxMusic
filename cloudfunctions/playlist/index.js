// 云函数入口文件
const cloud = require('wx-server-sdk')
let rp = require("request-promise")
cloud.init()
const db = cloud.database()
const url = 'http://musicapi.xiecheng.live/personalized'
// 云函数入口函数
const playCollection = db.collection('playlist')
const maxNum =100
exports.main = async (event, context) => {  
  //这是先获取到数据库中的数据
  let list = await playCollection.get()

  //因为云数据库，一次性只能取一百条数据，所以大于一百条时，要分次取
  // let count = await playCollection.count()
  // let total = count.total
  // let branchTimes = Math.ceil(total / maxNum) 
  // let tasks=[]
  // for(let i=0;i<branchTimes;i++){
  //   let promise = playCollection.skip(i * maxNum).limit(maxNum).get()
    
  //   tasks.push(promise)
  // }
 
  // let list ={
  //   data:[]
  // }
  // if(tasks.length>0){
  //   let list = (await promise.all(tasks)).reduce((acc,cur) => {
  //       return {
  //         data : acc.data.concat(cur.data)
  //       }
  //   })
  // }
 
  //这是请求的数据
    const playlist= await rp(url).then(res=>{
      return JSON.parse(res).result
    })
    //这是在去重的操作，让新老数据对比后加入
  let newData=[]
  for(let i=0,len1=playlist.length;i<len1;i++){
    let flag =true
    for(let j=0, len2=list.data.length;j<len2.length;j++){
      if(playlist[i].id===list.data[j].id){
        flag =false;
        break;
      }
    }
    if(flag){
      newData.push(playlist[i])
    }
  }
  
   //这是在朝数据库中加入数据
  for (let i = 0, len = newData.length;i<len;i++){
     await playCollection.add({
       data:{
         ...newData[i],
         creatTime:db.serverDate()
       }
     }).then(res=>{
       console.log('插入成功')
     }).catch(err=>{
       console.log("插入失败")
     })
   }

    return newData.length

}