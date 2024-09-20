const mongoose = require ("mongoose")




const taskschema = new mongoose.Schema({
    tasktitle:{
        type:String,
        required:[true, "please add a title"]
    },
   
    taskamount:{
        type:Number,
        required:[true, "please add a amount"]
    },
    taskdate:{
        type:String,
        required:[true, "please add a date"]
    },
   
    
})


const task = mongoose.model("task",taskschema)

module.exports = task;