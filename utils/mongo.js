const mongoose = require("mongoose")
const env = require("dotenv").config()

const url =process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce"



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
