const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name:String,
    price:String,
    rating:Number,
    area:String,
    serviceType:String
});

module.exports = mongoose.model('Vendor',vendorSchema);