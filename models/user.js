const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: [true,"email already exists! Try with a Diffrent One"],
    required: [true, "Email is required"], 
    match: [/.+@.+\..+/, "Please enter a valid email address"], 
   lowercase: true,
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
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const Security = 10;
  this.password = await bcrypt.hash(this.password, Security);
  next();
});

userSchema.methods.checkPassword = async function (enteredPw, password) {
  return await bcrypt.compare(enteredPw, password);
};


const UserMd= mongoose.model("UserMd", userSchema);

module.exports = UserMd;
