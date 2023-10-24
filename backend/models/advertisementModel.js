let mongoose = require('mongoose')
let advertisementSch = new mongoose.Schema({
    country: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "categories"
    },
    city: {
        required: true,
        type: String
    },
    zipcode: {
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String,
        minlength: 100,
        maxlength: 3000
    },
    image: {
        required: true,
        type: String
    }

});

exports.advertisementModel = mongoose.model('advertisments', advertisementSch)