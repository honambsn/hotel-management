module.exports = function(router) {
    var roomController = require('../controllers/room.controller');

    router.get('/room/list', roomController.get_list);

    router.get('/room/detail/:id', roomController.detail);

    router.post('/room/add', roomController.add_room);

    router.delete('/room/delete', roomController.remove_room);

    router.put('/room/update', roomController.update_room);

} 