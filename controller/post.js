const mongoose = require ("mongoose")
const create = require("../models/create")


const PostHandler = async(req,res)=>{
try{
const{title,body,description}= req.body
console.log(req.body)
if(title =="" && body =="" && description =="" ){
return console.log("all fields must be present ")
}
const cratoo = create.create({
    title,
    body,
    description

})
 
if(cratoo){
res.json("Hurray Your Item is created")

}
else{
    res.json("something went wrong") 
}



}
catch(error){
    console.log("error",error)
}





}



module.exports=PostHandler;