const db = require('../common/connect');

const Book = function(book) {
    this.id = book.id;
    this.name = book.name;
    this.image = book.image;
    this.author_id = book.author_id;

}


Book.get_all = function(result) {
    // var data = [{
    //     "id":1 ,
    //     "name":"book1"
    // },
    // {
    //     "id":1 ,
    //     "name":"book1"
    // },
    // {
    //     "id":1 ,
    //     "name":"book1"
    // },
    // {
    //     "id":1 ,
    //     "name":"book1"
    // }];
    db.query("select * from book", function(err, book) {
        if (err) {

            result(null);
        } else {
            result(book);
        }
    });
}

// Book.getById = function(id) {
//     var data = {
//         "id": id,
//         "name": "book1"
//     };
//     return data;
// }

Book.getById = function(id, result) {
    //console.log(id);
    db.query("select * from book where id =?", id, function(err, book) {
        console.log(err, book);
        if (err) {
            result(null);
        } else if (err || book.length === 0) {
            result(null);
        } else {
            result(book[0]);
        }
    });
}



Book.create = function(data, result) {
    //var data = {"id":id, "name":"book name"};
    //return (data);
    db.query("insert into book set ?", data, function(err, book) {
        if (err) {
            console.log(err);
            result(null);
        } else {
            console.log("added", "\n", data);
            result({ id: book.insertId, ...data })
        }
    })
}

Book.remove = function(id, result) {
    console.log(id);
    db.query("delete from book where id = ?", id, function(err, book) {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log("removed", "\n", id);
            result("Deleted successfully");

        }
    })

}

Book.update = function(update_data, result) {
    db.query("update book set name=?, image=?, author_id=? where id=? ", [update_data.name, update_data.image, update_data.author_id, update_data.id], function(err, book) {
        if (err) {
            console.log(err);
            result(null);
        } else {
            console.log("updated successfully");
            result(update_data);
        }
    })
}

module.exports = Book;