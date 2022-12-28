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

        // await mongoose.connect('mongodb://127.0.0.1:27017/hotel_dev')
        // console.log('Connect to Database(mongodb) successfully ' + "\n" + 'IP: mongodb://127.0.0.1:27017/hotel_dev' )

        await mongoose.connect('mongodb+srv://hotel_admin:nNqSS6TyzPL7vXkT@cluster0.5qio7bt.mongodb.net/hotel_dev?retryWrites=true&w=majority')
        console.log('Connect to Database(mongodb) successfully ' )
    }catch(error){
        console.log('Connect to Database(mongodb) Failed')
    }
}

module.exports = {connection};
