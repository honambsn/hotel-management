// todo/backend/controllers/api/top_pages_controller.js
exports.index = function (req, res, next) {
    res.json({message: "Top Page"})
  }

  
// todo/backend/config/api.routes.js
var TopPages = require('../controllers/api/top_pages_controller.js');

module.exports = function(router) {
  router.get('/top_pages', TopPages.index);
}
