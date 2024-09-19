const mongoose = require("mongoose")
const create = require("../models/create")

  


const DeleteHandler = async (req, res)=>{
const{postId} = req.params
try{
const delid = create.findByIdAndDelete(postId)
if(delid){
    res.json("Post Deleted as per Your wish")
}
else{
res.json("nasa baya delete chui nea gashaan")

}
}catch(err){
    res.json(err,"error ha chui boya")
}

}



module.exports=DeleteHandler