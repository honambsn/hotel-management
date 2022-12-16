var express = require('express')
var app = express();




// config bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods","get,post,put,delete");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//config router to access simultaneously 2 port "4200" (angular) and "3000" => 2500 (nodejs)
//allow access origin
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods","get,post,put,delete");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//routers config

const _AuthMiddleware = require('./app/common/_AuthMiddleware');
const userRouter = require('./app/routes/user.router');


// đặt nằm trc middleware để không check token cho việc login/signup
require('./app/routes/account.router')(app);


// các route nằm phía sau middleware đều đc check token khi đc gọi
app.use(_AuthMiddleware.isAuth);

require('./app/routes/user.router')(app);
require('./app/routes/room.router')(app);






//app.use('/',bookRouter);

const port = 3000;
//const port = 2500;
app.listen(port,function(){
    console.log("server running on", port);
});