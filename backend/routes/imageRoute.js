let express = require('express');
let {imageController} =require('../controller/imageContoler.js')
let imageRoute=express.Router();

imageRoute.get('/:name',imageController);
module.exports=imageRoute;