var Room = require('../models/room.model');
var JWT = require('../common/_JWT');

class RoomController{
    get_list(req, res,next){
        Room.find({})
            .then(rooms=>{
                rooms=rooms.map(room => room.toObject())
                res.json({ rooms })
            })
            .catch(next)
    }
    
    detail(req, res,next){
        Room.findOne({ slug: req.params.slug })
            .then(rooms=>{
                res.json({rooms})
            })
            .catch(next)
    }

    add_room(req, res,next){
        const room = new Room(req.body)
        room
            .save()
            .then(()=>res.json({ rooms }))
            .catch((error)=>{})
    }

    remove_room(req, res,next){
        Room.deleteOne({_id: req.params.id })
            .then(()=>res.json({rooms}))
            .catch(next)
    }

    //edit tung room nho le 
    update_room(req, res,next){
        Room.findById(req.params.id)
            .then(rooms=>{
                rooms=rooms.map(room => room.toObject())
                res.json({ rooms })
            })
            .catch(next)
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

module.exports = new RoomController