var User = require('../models/user.model');
var JWT = require('../common/_JWT');
var Room = require('../models/room.model');
var Service = require('../models/service.model')
var userService = require('../common/userServices');
var moment = require('moment');
var bookController = require('../controllers/book.controller');
var Book = require('../models/book.model');

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
        const {email} = req.body.email
        userService.check_existed_account({email},(error,result)=>{
            if(error) {
                return res.send({result:false ,status:false});
            }
            if(result==false){
                return res.send({result:'error',status:false})
            }
            else{
            const user = new User(req.body)
            user
                .save()
                return res.status(200).json({
                    status:true,
                   
                    data: result,
                    user
                })
            }
        })
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


    async add_bookedroom_to_user(req,res,next){
        const user = await User.findById(req.params.id)
        const {_id} = req.body
        const fromDate = moment(req.body.checkInAt,'DD/MM/YYYY')
        const toDate = moment(req.body.checkOutAt,'DD/MM/YYYY')
        const DayAmount = moment.duration(toDate.diff(fromDate)).asDays()
        console.log(DayAmount)
        userService.check_room_status({_id},user,async(error,result)=>{
            if(error) {
                return next(error)
            }
            if(result==true){
            const room = await Room.findByIdAndUpdate({_id},{room_status:'Booked',checkInAt:req.body.checkInAt,checkOutAt:req.body.checkOutAt})
            const user = await User.findById(req.params.id)
            user.roombooked.push(room._id)
            user.save()
            bookController.add_book_item(room,user,DayAmount,fromDate,toDate)
            return res.status(200).json({user})
            }
            else{
            res.send('this room was already booked')
            }
        })
    }

    async cancel_room(req,res,next){
        const room = await Room.findByIdAndUpdate(req.body,{room_status:'Empty',checkInAt:null,checkOutAt:null})
        const user = await User.findById(req.params.id)
        const removeditem = user.roombooked.indexOf(room._id)
        user.roombooked.splice(removeditem,1)
        user.save()
        bookController.add_cancel_item(room,user,next)
        return res.status(200).json({user})
    }

    async add_bookedservice_to_user(req,res,next){
        const user = await User.findById(req.params.id)
        const service = await Service.findById(req.body)
        user.servicebooked.push(service.type_of_service)
        bookController.add_bookservice_item(service,user)
        await user.save()
        res.json({user})
    }

    async cancel_service(req,res,next){
        const service = await Service.findById(req.body)
        const user = await User.findById(req.params.id)
        const removeditems = user.servicebooked.indexOf(service.type_of_service)
        user.servicebooked.splice(removeditems,1)
        bookController.add_cancelservice_item(service,user)
        await user.save()
        res.json({user})
    }

    async resetpayment_addpoint(req,res,next){
        const user = await User.findById(req.body._id)
        user.point += user.payment*0.1
        user.payment = 0
        await user.save()
        .then(()=>{
            res.json(user)
        })
        .catch(next)     
    }


    async reset_bookedroom_when_checkout(req,res,next){
        const user = await User.findById(req.body._id)
        user.roombooked.forEach(async(room,index,roombooked)=>{
            room = await Room.findById(roombooked[index])
            room.room_status = 'Empty'
            room.checkInAt = null
            room.checkOutAt = null
            await room.save()
        })
        user.roombooked = []
        user.servicebooked=[]
        await user.save()
        res.send('Reset Success')
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