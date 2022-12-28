const db = require('../common/connect');
const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator')
mongoose.plugin(slug);
const Schema = mongoose.Schema

const Service = new Schema({
    type_of_service:{type:String},
    price:{type:String},
    service_status:{type:String,default:'Empty'},
    slug:{type: String,slug:'type_of_service',unique: true},
})

module.exports=mongoose.model('Service', Service);