let isAuth = async function(req, res, next) {
    var _JWT = require("../common/_JWT")
    var _token = req.headers.authorization;
    if (_token){
        try {
            var authData = await _JWT.check(_token);

            req.auth = authData;
            next();
        }catch(err) {
            return res.send({data: "Token not valid"});
        }
    } else {
        return res.send({data: "token not found"});
    }
    console.log(req.headers);
}


module.exports ={
    isAuth: isAuth,
}