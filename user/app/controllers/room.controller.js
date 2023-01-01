var Room = require('../models/room.model');
var JWT = require('../common/_JWT');

class roomController{
    get_list(req, res,next){
        Room.find({})
            .then(rooms=>{
                rooms=rooms.map(room => room.toObject())
                res.json({ rooms })
            })
            .catch(next)
    }
    
    detail(req, res,next){
        Room.findById( req.params.id )
            .then(rooms=>{
                res.json({rooms})
            })
            .catch(next)
    }

    add_room(req, res,next){
        const room = new Room(req.body)
        room
            .save()
            .then(()=>res.json(req.body))
            .catch((error)=>{})
    }

    remove_room(req, res,next){
        Room.deleteOne({_id: req.params.id })
            .then(rooms=>res.json({rooms}))
            .catch(next)
    }

    //edit tung room nho le 
    update_room(req, res,next){
        Room.updateOne({_id: req.params.id },req.body)
            .then(rooms=>{
                res.json({rooms})
            })
            .catch(next)
    }

    update_all_room(req, res,next){
        Room.updateMany(req.body)
            .then(rooms=>{
                res.json({rooms})
            })
            .catch(next)
    }

    update_standard_room(req, res,next){
        Room.updateMany({room_type:'standard'},req.body)
            .then(rooms=>{
                res.json({rooms})
            })
            .catch(next)
    }

    update_premium_room(req, res,next){
        Room.updateMany({room_type:'premium'},req.body)
            .then(rooms=>{
                res.json({rooms})
            })
            .catch(next)
    }

    update_vip_room(req, res,next){
        Room.updateMany({room_type:'vip'},req.body)
            .then(rooms=>{
                res.json({rooms})
            })
            .catch(next)
    }

    async add_image(req,res,next){
        const room = await Room.findById(req.params.id)
        room.room_img.push(req.body.room_img)
        room.save()
        return res.status(200).json({room})
    }

    async delete_image(req,res,next){
        const room = await Room.findById(req.params.id)
        const removeditem = room.room_img.indexOf(req.body)
        room.room_img.splice(removeditem,1)
        room.save()
        return res.status(200).json({room})
    }

} 
// exports.get_list = function (req, res) {
//     Room.get_all(function (data) {
//         return res.send({result:data})
//     });
// } 


// exports.detail = function (req, res) {
//     Room.getById(req.params.id, function (respnse) {
//         return res.send({result:respnse});
//     });
// }


// exports.add_room = function (req, res) {
//     var data = req.body;
//     Room.create(data, function (respnse) {
//         return res.send({result:respnse});
//     });
// }

// exports.remove_room = function(req, res) {
//     var id = req.params.id;
//     Room.remove(id, function(respnse){
//         return res.send({result:respnse});
//     });
// }

// exports.update_room = function (req, res) {
//     var data= req.body;
//     Room.update(data, function (respnse) {
//         return res.send({result:respnse});
//     });
// }

module.exports = new roomController
