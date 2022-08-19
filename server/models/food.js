let mongoose = require('mongoose');

// create a model class
let foodModel = mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
}, {
    collection: "foods"
});

module.exports = mongoose.model('Food', foodModel);