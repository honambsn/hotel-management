var Room = require('../models/room.model');
var JWT = require('../common/_JWT');

exports.get_list = function (req, res) {
    Room.get_all(function (data) {
        return res.send({result:data})
    });
} 


exports.detail = function (req, res) {
    Room.getById(req.params.id, function (respnse) {
        return res.send({result:respnse});
    });
}


exports.add_room = function (req, res) {
    var data = req.body;
    Room.create(data, function (respnse) {
        return res.send({result:respnse});
    });
}

exports.remove_room = function(req, res) {
    var id = req.params.id;
    Room.remove(id, function(respnse){
        return res.send({result:respnse});
    });
}

exports.update_room = function (req, res) {
    var data= req.body;
    Room.update(data, function (respnse) {
        return res.send({result:respnse});
    });
}