const mongoose = require("mongoose");

let categorySch = new mongoose.Schema({
    name: String
});
exports.categoriesModel = mongoose.model('categories', categorySch)