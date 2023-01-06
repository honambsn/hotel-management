var Room = require('../models/room.model');
var Service = require('../models/service.model');
var User = require('../models/user.model');
var Book = require('../models/book.model');
var Bookservice = require('../models/bookservice.model')
var moment = require('moment')

class bookController{
    async add_book_item(room,user,DayAmount,fromDate,toDate){
        var payment = DayAmount * room.price
        const book = new Book({
        customer_name:user.name,
        room_id: room._id,
        room_no: room.room_no,
        room_type: room.room_type,
        user_booking_id:user._id,
        price:room.price,
        checkInAt:fromDate,
        checkOutAt:toDate,
        totalAmount:payment,
        room_status:'Booked'
        })
        book.save()
        user.payment += book.totalAmount
    }       

    async add_cancel_item(room,user,next){
        //var payment = user.payment - book.price
        const book = await Book.findOneAndUpdate({room_id:room._id,user_booking_id:user._id,room_status:'Booked'},{room_status:'Cancelled'})
        user.payment -= book.totalAmount
        await user.save()
    }

    async add_bookservice_item(service,user){
        const bookservice = new Bookservice({
        customer_name:user.name,
        user_booking_id:user._id,
        service_id: service._id,
        type_of_service: service.type_of_service,
        price:service.price,
        service_status:'Booked'
        })
        bookservice.save()
        user.payment += bookservice.price
    } 

    async add_cancelservice_item(service,user){
        const bookservice = await Bookservice.findOneAndUpdate({service_id:service._id,user_booking_id:user._id,service_status:'Booked'},{service_status:'Cancelled'})
        user.payment -= bookservice.price
        await user.save()
    }
}
module.exports = new bookController