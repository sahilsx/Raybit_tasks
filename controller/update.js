const mongoose = require ("mongoose")
const create = require ("../models/create")



const UpdateHandler = (req,res)=>{
try{
    const {postId} = req.params
const {title,body,description}= req.body

  if (!postId || !title || !body || !description) {
    return res.status(400).json({ message: "Required fields are missing" });
}
 const update= create.findByIdAndUpdate(postId,{
title,
body,
description
 })
 if(update){
  res.json("update ha gov baya",update)

 }
 else{
    res.json("khabar kya daleel chi gachanii chunea")

 }

 


}
catch(error){
console.log("error ha chui baya",error)

}



}


module.exports=UpdateHandler 