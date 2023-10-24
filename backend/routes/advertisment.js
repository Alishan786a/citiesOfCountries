let express = require('express');
const {addAdvertisment,delSingleAdvertisment,getSingleAdvertisment,updateAdvertisment,getAllAdvertisment,searchAdvertisment} =require('../controller/advertismentControler');
let advertisementRoute=express.Router();
let {upload} =require('../config.js/multerConfig');
advertisementRoute.route('/').get(getAllAdvertisment);
// get and delete single advertisment
advertisementRoute.route('/:id').put(upload.single('cityimage'),updateAdvertisment).get(getSingleAdvertisment).delete(delSingleAdvertisment);

advertisementRoute.route('/add').post(upload.single('cityimage'),addAdvertisment);
advertisementRoute.route('/search/:country').get(searchAdvertisment);

module.exports=advertisementRoute;