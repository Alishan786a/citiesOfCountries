let express=require('express');
const { getAllCategories } = require('../controller/categoryController');
let categoriesRoute = express.Router()


categoriesRoute.route('/').get(getAllCategories);

module.exports=categoriesRoute;