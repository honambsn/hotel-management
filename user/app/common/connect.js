// var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'demo_node_api'
// });

// connection.connect(function(err) {
//     if (err) {
//         console.log('Connection error: ' + err.message);

//     } else {
//         console.log('Connection success!');
//     }
// });

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connection(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/hotel_dev')
        console.log('Connect to Database(mongodb) successfully ' + "\n" + 'IP: mongodb://127.0.0.1:27017/hotel_dev' )
    }catch(error){
        console.log('Connect to Database(mongodb) Failed')
    }
}

module.exports = {connection};
