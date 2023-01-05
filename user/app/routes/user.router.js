
module.exports = function(router) {
    var userController = require('../controllers/user.controller');
    
    router.get('/user/list', userController.get_list);

    router.get('/user/detail/:id', userController.detail);
    //router.get('/user/add', userController.add_user);
    router.post('/user/add', userController.add_user);
    
    router.delete('/user/delete/:id', userController.remove_user);

    router.patch('/user/update/:id', userController.update_user);
    router.patch('/user/update', userController.update_all_user);

    router.post('/user/login', userController.login);

    router.post('/user/detail/:id/bookedroom',userController.add_bookedroom_to_user)

    router.post('/user/detail/:id/cancelroom',userController.cancel_room)

    router.post('/user/detail/:id/bookedservice',userController.add_bookedservice_to_user)

    router.post('/user/detail/:id/cancelservice',userController.cancel_service)

    router.post('/user/resetaddpoint',userController.resetpayment_addpoint)

    router.post('/user/resetroom',userController.reset_bookedroom_when_checkout)
    //router.post('/user/login', userController.login);
}