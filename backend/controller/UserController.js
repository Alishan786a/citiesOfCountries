const { sendCookies } = require("../config.js/sendcookies");
const userSch = require("../models/userSch");

let userLogin=async (req,res)=>{

let {email,password}=req.body;
// console.log(email,password);
if (!email || !password) {
    return res.send({sms:"please enter email and password"})   
}
let user=await userSch.findOne({email,password});

if(!user){
    return res.send({sms:"please enter correct info"})
}
sendCookies(req,res,user)
};


// profile
let userProfile=async (req,res)=>{
res.send({sms:"login successfully",user:req.user})
}

module.exports={userLogin,userProfile}