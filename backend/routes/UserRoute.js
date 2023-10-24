let express=require('express');
let UserRoute=express.Router();
let {userLogin,userProfile} =require('../controller/UserController.js');
const { isAdmin } = require('../config.js/isAdmin.js');

UserRoute.route('/me').get(isAdmin,userProfile)
UserRoute.route('/login').post(userLogin)


module.exports=UserRoute