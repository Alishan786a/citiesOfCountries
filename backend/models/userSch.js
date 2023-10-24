let mongoose=require('mongoose');
let jwt=require('jsonwebtoken')
let userSch=new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    type:String
});
userSch.methods.generateToken=async function() {
    let token=await jwt.sign({id:this._id},'evsproject',{ expiresIn: '5d' });
    return token;
}
module.exports=mongoose.model('users',userSch)