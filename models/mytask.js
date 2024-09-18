const mongoose = require("mongoose")


const mytask = mongoose.model("mytask",{
  title:String,
  starttime:String,
  endtime:String,
  completed:Boolean,
  
  



}
)


module.exports = mytask;