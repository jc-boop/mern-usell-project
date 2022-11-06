const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    listing_title: {type:String, required:true},
    listing_price: {type:Number, required:true},
    listing_category: {type:String, required:true},
    listing_description: {type:String, required:true},
    listing_img: {type:String},
    listing_comments: [{ name: String, comment: String, date: Date}],
    date_posted: {type:Date, default:Date.now},
    listing_password: {type:String, required:true}
});

const Listings = mongoose.model('listings', listingSchema);
const mySchemas = {'Listings':Listings};

module.exports = mySchemas;