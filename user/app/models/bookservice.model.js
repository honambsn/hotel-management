const db = require('../common/connect');
const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator')
mongoose.plugin(slug);
const Schema = mongoose.Schema

const Bookservice = new Schema({
    customer_name:{type: String},
    user_booking_id:{type: String},
    service_id:{type: String},
    type_of_service:{type:String},
    price: {type: Number},
    service_status:{type: String}
},{
    timestamps:true,
})

module.exports=mongoose.model('Bookings Service', Bookservice);