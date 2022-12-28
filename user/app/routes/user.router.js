
module.exports = function(router) {
    var userController = require('../controllers/user.controller');
    
    router.get('/user/list', userController.get_list);

    router.get('/user/detail/:id', userController.detail);

    //router.get('/user/add', userController.add_user);
    router.post('/user/add', userController.add_user);
    
    router.delete('/user/delete/:id', userController.remove_user);

    router.patch('/user/update/:id', userController.update_user);

    router.post('/user/login', userController.login);

    router.post('/user/detail/:id/bookedroom',userController.add_bookedroom_to_user)


    //router.post('/user/login', userController.login);
}