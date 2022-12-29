
module.exports = function(router) {
    var serviceController = require('../controllers/service.controller');

    router.get('/service/list', serviceController.get_list);

    router.get('/service/detail/:id', serviceController.detail);

    //router.get('/service/add', serviceController.add_service);
    router.post('/service/add', serviceController.add_service);

    router.delete('/service/delete/:id', serviceController.remove_service);

    router.patch('/service/update/:id', serviceController.update_service);

} 