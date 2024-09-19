const mongoose = require("mongoose")


const url ="mongodb+srv://sahilsahil0901:sahilsss@cluster0.heqeg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



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
