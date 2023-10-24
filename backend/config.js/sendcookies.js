
exports.sendCookies=async (req,res,user)=>{
    let token=await user.generateToken();
    res.cookie('token',token,{expires:new Date(Date.now()+(5*24*60*60*1000))}).status(200).send({
        sms:"login Successfully",
        user
    })
  
   
}
