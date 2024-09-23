const mongoose = require("mongoose");

const myTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'], 
    minlength: [5, 'Title must be at least 1 character long'], 
    maxlength: [100, 'Title cannot exceed 100 characters'] 
  },
  starttime: {
    type: String,
    required: [true, 'Start time is required'], 
    
  },
  endtime: {
    type: String,
    required: [true, 'End time is required'], 
    
  },
  completed: {
    type: Boolean,
    default: false 
  }
});


const MyTask = mongoose.model("MyTask", myTaskSchema);

module.exports = MyTask;
