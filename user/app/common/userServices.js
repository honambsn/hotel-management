const User = require('../models/user.model')
const Room = require('../models/room.model');
const Service = require('../models/service.model')
const Auth = require('../common/_AuthMiddleware')
const jwt = require('../common/_JWT')

async function check_login({email,password},callback){
    const user = await User.findOne({email})
    if(user != null){
        if(password===user.password){
            const token = await jwt.make(email)
            const result  = {token, user}
            console.log(result)
            return callback(null,result)
        }
        else return callback({
            message: "Invalid Password/Email"
        })
    }
    else return callback({
        message: "Invalid Password/Email"
    })
}

// async function check_room_status({_id},res){
//     const room = await Room.findById({_id})
//     if(room.room_status=='Empty'){
//         console.log(room.room_status)
//         return res.send('true')
//     }
//     else return false
// }

async function check_room_status({_id},callback){
    const room = await Room.findById({_id})
    if(room != null){
        console.log(room.room_status)
        if(room.room_status==='Empty'){
            result = true
            return callback(null,result)
        }
        else {
            result = false
            return callback(null,result)
        }
    }
    else {
        result = false
        return callback(null,result)
    }
}

async function check_existed_account({email},callback){
    const user = await User.find({email})
    console.log(user._id)
    if(user.id === undefined){
        result = true
        return callback(null,result)
    }
    else{
        result = false
        return callback(null,result)
    }
}

async function check_service_status({_id},callback){
    const service = await Service.findById({_id})
    if(service != null){
        if(service.service_status==='Empty'){
            result = true
            return callback(null,result)
        }
        else {
            result = false
            return callback(null,result)
        }
    }
    else {
        result = false
        return callback(null,result)
    }
}

module.exports = {
    check_login,
    check_room_status,
    check_service_status,
    check_existed_account
}