const Sign = require("../../models/signmd");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")



const signHandler = async (req, res) => {
  const { email, firstname, lastname, password } = req.body; 
  console.log(req.body);

  if (!email || !firstname || !lastname || !password) {
    return res.json({ message: "Missing Required Fields ! All Fields Must Be Filled...." });
  }

  if (password.length < 6) { 
    return res.json({ message: "Password Must Be 6 Characters Long" });
  }

  
  const existingUser = await Sign.findOne({ email });

  if (!existingUser) {
    const hashedPass = await bcrypt.hash(password, 10);
    const createUser = await Sign.create({
      email,
      firstname, 
      lastname,
      password: hashedPass
    });

    if (createUser) {
      return res.json({ message: "User Created Successfully!!!", createUser });
    }
  } else {
    return res.json({ message: "User Already Exists! Try With Different Email" }); 
  }
};



 
const loginHandler = async(req,res)=>{
const {email, password} = req.body

if(!email || !password){
    res.json({message:"Provide Both Email "})
};

const isUser = await Sign.findOne({ email });

if(isUser){
 const passVerify = await bcrypt.compare(password, isUser.password);
 if(passVerify){
    res.json({message:"Your are Logged in Successfully! Now Enjoy unlimited access....."})
 }else{
    res.json({message:"Password Is Incorrect....Try With a Valid One!!"})
 }

}else{
 res.json({message:"No User Found! Email Doesn't Exists"})
}













}


module.exports = {signHandler, loginHandler};