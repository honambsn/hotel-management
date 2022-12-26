var User = require('../models/user.model');
var JWT = require('../common/_JWT');

exports.get_list = function (req, res) {
    User.get_all(function (data) {
        return res.send({result:data})
    });
}

exports.detail = function (req, res) {
    User.getById(req.params.id, function (respnse) {
        return res.send({result:respnse});
    });
}


exports.add_user = function (req, res) {
    var data = req.body;
    User.create(data, function (respnse) {
        return res.send({result:respnse});
    });
}

exports.remove_user = function(req, res) {
    var id = req.params.id;
    User.remove(id, function(respnse){
        return res.send({result:respnse});
    });
}

exports.update_user = function (req, res) {
    var data= req.body;
    User.update(data, function (respnse) {
        return res.send({result:respnse});
    });
}

exports.login = function (req, res) {
    var data = req.body;
    User.check_login(data, async function (respnse) {
        if (respnse) {
            const _token = await JWT.make(respnse);
            console.log("TOKEN: ",_token);
            return res.send({result: _token, status: true});
        }
        else {
            return res.send({result:"error", status:false});
        }
        //send về data user đã login
        return res.send({result:respnse});
    });
}
