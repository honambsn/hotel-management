module.exports = function(router) {
    var roomController = require('../controllers/room.controller');

    router.get('/room/list', roomController.get_list);

    router.get('/room/detail/:id', roomController.detail);

    router.post('/room/add', roomController.add_room);

    router.delete('/room/delete/:id', roomController.remove_room);

    router.patch('/room/update/:id', roomController.update_room);

    router.patch('/room/update', roomController.update_all_room);

} 