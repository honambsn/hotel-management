var User = require('../models/user.model');
var JWT = require('../common/_JWT');
var Room = require('../models/room.model');
var Service = require('../models/service.model')
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

    update_all_user(req, res,next){
        User.updateMany(req.body)
            .then(users=>{
                res.json({users})
            })
            .catch(next)
    }

    login(req,res,next){
        const {email,password} = req.body
        
        userService.check_login({email,password},(error,result)=>{
            if(error) {
                return res.send({result:"error", status:false});
            }
            
            return res.status(200).json({
                status:true,
               
                data: result,
                
            })
        })
    }



    add_bookedroom_to_user(req,res,next){
        const {_id} = req.body
        userService.check_room_status({_id},async(error,result)=>{
            if(error) {
                return next(error)
            }
            if(result==true){
            const room = await Room.findByIdAndUpdate(req.body,{room_status:'Booked'})
            const user = await User.findById(req.params.id)
            user.roombooked.push(room._id)
            user.save()
            return res.status(200).json({user})
            }
            else{
            res.send('this room was already booked')
            }
        })
    }

    async cancel_room(req,res,next){
        const room = await Room.findByIdAndUpdate(req.body,{room_status:'Empty'})
        const user = await User.findById(req.params.id)
        const removeditem = user.roombooked.indexOf(room._id)
        console.log(room._id)
        user.roombooked.splice(removeditem,1)
        user.save()
        return res.status(200).json({user})
    }

    add_bookedservice_to_user(req,res,next){
        const {_id} = req.body
        userService.check_service_status({_id},async(error,result)=>{
            if(error) {
                return next(error)
            }
            if(result==true){
            const service = await Service.findByIdAndUpdate(req.body,{service_status:'Booked'})
            const user = await User.findById(req.params.id)
            user.servicebooked.push(service._id)
            user.save()
            return res.status(200).json({user})
            }
            else{
            res.send('this service was already booked')
            }
        })
    }

    async cancel_service(req,res,next){
        const service = await Service.findByIdAndUpdate(req.body,{service_status:'Empty'})
        const user = await User.findById(req.params.id)
        const removeditem = user.servicebooked.indexOf(service._id)
        user.roombooked.splice(removeditem,1)
        user.save()
        return res.status(200).json({user})
    }


    // async print_room(){
    //     const room = await Room.findByIdAndUpdate(req.body,{room_status:'Empty'})
    //     const user = await User.findById(req.params.id)
    //     user.roombooked.forEach()
    // }

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