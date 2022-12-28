const User = require('../models/user.model')
const Room = require('../models/room.model');
const Auth = require('../common/_AuthMiddleware')
const jwt = require('../common/_JWT')

async function check_login({email,password},callback){
    const user = await User.findOne({email})
    if(user != null){
        if(password===user.password){
            const token = jwt.make(email)
            return callback(null,user,token)
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

module.exports = {
    check_login,
    check_room_status
}