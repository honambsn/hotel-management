var User = require('../models/user.model');
var JWT = require('../common/_JWT');
var userService = require('../common/userServices');

class userController{
    get_list(req, res,next){
        User.find({})
            .then(users=>{
                users=users.map(user => user.toObject())
                res.json({ users })
            })
            .catch(next)
    }
    
    detail(req, res,next){
        User.findById(req.params.id)
            .then(users=>{
                res.json({users})
            })
            .catch(next)
    }

    add_user(req, res,next){
        const user = new User(req.body)
        user
            .save()
            .then(()=>res.json(req.body))
            .catch((error)=>{})
    }

    remove_user(req, res,next){
        User.deleteOne({_id: req.params.id })
            .then(users=>res.json({users}))
            .catch(next)
    }

    update_user(req, res,next){
        User.updateOne({_id: req.params.id },req.body)
            .then(users=>{
                res.json({users})
        })
        .catch(next)
    }

    login(req,res,next){
        const {email,password} = req.body
        
        userService.check_login({email,password},(error,result)=>{
            if(error) {
                return next(error)
            }
            return res.status(200).json({
                status:true,
                data: result,
            })
        })
    }


}

// exports.get_list = function (req, res) {
//     User.get_all(function (data) {
//         return res.send({result:data})
//     });
// }

// exports.detail = function (req, res) {
//     User.getById(req.params.id, function (respnse) {
//         return res.send({result:respnse});
//     });
// }


// exports.add_user = function (req, res) {
//     var data = req.body;
//     User.create(data, function (respnse) {
//         return res.send({result:respnse});
//     });
// }

// exports.remove_user = function(req, res) {
//     var id = req.params.id;
//     User.remove(id, function(respnse){
//         return res.send({result:respnse});
//     });
// }

// exports.update_user = function (req, res) {
//     var data= req.body;
//     User.update(data, function (respnse) {
//         return res.send({result:respnse});
//     });
// }

// exports.login = function (req, res) {
//     var data = req.body;
//     User.check_login(data, async function (respnse) {
//         if (respnse) {
//             const _token = await JWT.make(respnse);
//             console.log("TOKEN: ",_token);
//             return res.send({result: _token, status: true});
//         }
//         else {
//             return res.send({result:"error", status:false});
//         }
//         //send về data user đã login
//         return res.send({result:respnse});
//     });
// }
module.exports = new userController