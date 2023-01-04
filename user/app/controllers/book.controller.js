var Room = require('../models/room.model');
var Service = require('../models/service.model');
var User = require('../models/user.model');
var Book = require('../models/book.model');
var moment = require('moment')

class bookController{
    async add_book_item(room,user,DayAmount,fromDate,toDate){
        var payment = DayAmount * room.price
        const book = new Book({
        room_id: room._id,
        room_no: room.room_no,
        room_type: room.room_type,
        user_booking_id:user._id,
        price:payment,
        checkInAt:fromDate,
        checkOutAt:toDate,
        room_status:'Booked'
        })
        book.save()
        user.payment += book.price
    }       

    async delete_book_item(room,user,next){
        //var payment = user.payment - book.price
        const book = await Book.find({room_id:room._id,user_booking_id:user._id})
    }
}
module.exports = new bookController