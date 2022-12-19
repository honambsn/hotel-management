
module.exports = function(router) {
    var userController = require('../controllers/user.controller');
    
    router.get('/user/list', userController.get_list);

    router.get('/user/detail/:id', userController.detail);

    router.post('/user/add', userController.add_user);
    
    router.delete('/user/delete', userController.remove_user);

    router.put('/user/update', userController.update_user);


    //router.post('/user/login', userController.login);
}