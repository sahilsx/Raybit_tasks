const create = require("../models/create")


const GetallHandler = (req,res)=>{


const alls=create.find()
 if(!alls){
 res.json("atii na chui nea kehen baya")

 }
 res.json("yekya chui sorui khn bayaaa", alls)



}


module.exports=GetallHandler;