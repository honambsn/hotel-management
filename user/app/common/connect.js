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
        await mongoose.connect('mongodb+srv://hotel_admin:nNqSS6TyzPL7vXkT@cluster0.5qio7bt.mongodb.net/hotel_dev')
        console.log('Connect Successfully')
    }catch(error){
        console.log('Connect Failed')
    }
}

module.exports = {connection};
