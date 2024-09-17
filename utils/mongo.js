const mongoose = require("mongoose")


const url ="mongodb://localhost:27017/create"



const connection = async ()=>{
    try{
        await mongoose.connect(url)
        console.log(`database connected on url ${url}`)

    }
    catch(error){
     console.log(error)


    }



}
module.exports=connection 
