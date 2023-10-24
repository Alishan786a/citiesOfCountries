let jwt=require('jsonwebtoken');
const userSch = require('../models/userSch');
exports.isAdmin=async (req,res,next)=>{
    let {token}=req.cookies;
    if (!token) {
        return res.send({sms:"token not avaliable"})
        
    }
    let authen= jwt.verify(token,'evsproject');
  
    if (!authen.id) {
        return res.send({sms:"authentication fail please login"})
    }
    let user=await userSch.findById(authen.id,{password:0});
    if (!user) {
        return res.send({sms:"user not found"})
        
    }
    req.user=user;
   next();
    
}