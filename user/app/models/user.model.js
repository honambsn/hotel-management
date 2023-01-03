const db = require('../common/connect');
const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator')
mongoose.plugin(slug);
const Schema = mongoose.Schema

const User = new Schema({

    name: {type: String,default:'Guest'},
    email: {type: String,default:'example@mail.com'},
    password: {type: String,default:'123abc'},
    dob: {type: String,default:'31/0/2002'},
    address: {type:String, default:'227 D. Nguyen Van Cu, Ward 4, District 5, Ho Chi Minh City'},
    type: {type:String, default:'customer'},
    roombooked:[{type:String,default:'Empty',ref:'Room'}],
    servicebooked:[{type:String,default:'Empty',ref:'Service'}],
    payment: {type: Number},
    slug:{type: String,slug:'name',unique: true},
})

// const User = function(user){
//     this.id = user.id;
//     this.name = user.name;
//     this.email = user.email;
//     this.password = user.password;
// }

// User.get_all = function(result) {
//     db.query("select * from users ", function(err, user){
//         if (err) return(null)

//         else result(user);
//     });
// }

// User.getById = function(id, result) {
//     db.query("select * from users where id =? ",id, function(err, user){
//         if (err || user.length == 0) result (null);

//         else result(user[0]);

//     });
// }

// User.create = function(data, result)  {
//     db.query("insert into users set ?", data, function(err, user){
//         if(err) result(null);

//         else  result({id: user.insertId, ...data});
//     });

// }

// User.remove = function(id, result) {
//     db.query("delete from users where id =? ",id, function(err, user){
//         if (err) result(null);

//         else result("deleted"+ id + "successfully" );
//     });
// }

// User.update = function(data_set,result) {
//     db.query("update users set name= ?, email = ?, password = ? where id= ?", [data_set.name, data_set.email, data_set.password], function(err, user) {
//         if (err) result(null);
//         else {
//             console.log("updated successfully");
//             result(update_data);
//         }
//     });
// }

// User.check_login = function(data_set, result) {
//     db.query("select * from users where email = ? and password = ?", [data_set.email, data_set.password], function(err, user){
//         if (err || data_set.length == 0  ){
//             result(null);
//         }
//         else {
//             //console.log("login successfully");
//             //console.log(user);
//             result(user[0]);
//         }

//     });
// }

module.exports=mongoose.model('User', User);