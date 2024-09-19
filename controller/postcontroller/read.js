const mongoose = require ("mongoose")
const create = require("../models/create")



const ReadHandler=(req,res)=>{
try{
const {postId} = req.params
const read = create.findOne(postId)
if(read){
res.json("post ha chui yekya baya",read)
}

else{
   return res.json("mya chui nea basaan post chui baya id kr recheck")

}

}catch(err){
    console.log("cxe vonnui na error chui baya",err)
}



}


module.exports=ReadHandler;