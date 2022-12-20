const User = require('../models/user.model')
const Auth = require('../common/_AuthMiddleware')
const jwt = require('../common/_JWT')

async function login({email,password},callback){
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

module.exports = {
    login
}