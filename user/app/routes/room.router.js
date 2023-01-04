module.exports = function(router) {
    var roomController = require('../controllers/room.controller');

    router.get('/room/list', roomController.get_list);

    router.get('/room/detail/:id', roomController.detail);

    router.post('/room/add', roomController.add_room);
    router.post('/room/detail/:id/addimage', roomController.add_image)
    router.post('/room/detail/:id/deleteimage', roomController.delete_image)

    router.delete('/room/delete/:id', roomController.remove_room);

    
    router.patch('/room/update', roomController.update_all_room);
    router.patch('/room/update/standardroom', roomController.update_standard_room)
    router.patch('/room/update/premiumroom', roomController.update_premium_room)
    router.patch('/room/update/viproom', roomController.update_vip_room)
    router.patch('/room/update/:id', roomController.update_room);

} 