const db = require('../common/connect');
const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator')
mongoose.plugin(slug);
const Schema = mongoose.Schema

const Book = new Schema({
    room_id:{type: String},
    room_no: {type: String,},
    room_type: {type: String,},
    user_booking_id:{type: String},
    price: {type: Number},
    checkInAt: {type: String},
    checkOutAt: {type: String},
    totalAmount:{type: Number},
    room_status: {type: String,default:'Empty'},
},{
    timestamps:true,
})

module.exports=mongoose.model('Bookings', Book);