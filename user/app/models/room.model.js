const db = require('../common/connect');

const Room = function(room){
    this.id = room.id;
    this.room_no = room.room_no;    
    this.room_type = room.room_type;
    this.price = room.price;
    this.room_status = room.room_status;
    this.clean_status = room_status;
}


Room.get_all = function(result) {
    db.query("select * from rooms ", function(err, test){
        if (err) return(null)

        else result(test);
    });
}

Room.getById = function(id, result) {
    db.query("select * from rooms where id =? ",id, function(err, room){
        if (err || room.length == 0) result (null);

        else result(room[0]);

    });
}

Room.create = function(data, result)  {
    db.query("insert into rooms set ?", data, function(err, room){
        if(err) result(null);

        else  result({id: room.insertId, ...data});
    });

}

Room.remove = function(id, result) {
    db.query("delete from rooms where id =? ",id, function(err, room){
        if (err) result(null);

        else result("deleted"+ id + "successfully" );
    });
}

Room.update = function(data_set,result) {
    db.query("update rooms set room_no= ?, room_type = ?, price = ?, room_status = ?, clean_status = ? where id= ?", [data_set.room_no, data_set.room_type, data_set.price, data_set.room_status, data_set.clean_status], function(err, room) {
        if (err) result(null);
        else {
            console.log("updated successfully");
            result(update_data);
        }
    });
}



module.exports = Room;