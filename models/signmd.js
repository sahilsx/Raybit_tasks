const mongoose = require("mongoose")

const signupschema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"], 
    match: [/.+@.+\..+/, "Please enter a valid email address"], 
  },
  firstname: {
    type: String,
    required: [true, "Firstname is required"], 
  },
  lastname:{
    type: String,
    required: [true, "lastname is required"], 
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});




const Sign = mongoose.model("Sign", signupschema);

module.exports = Sign;
