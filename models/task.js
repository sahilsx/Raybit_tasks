const mongoose = require("mongoose")


const task = mongoose.model("task",{
  title:String,
  starttime:String,
  endtime:String,
  completed:Boolean,
  
  



}
)


module.exports = task;