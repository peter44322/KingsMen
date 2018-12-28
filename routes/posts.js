var express = require('express');
var router = express.Router();
var PostController = require('../controllers/PostController');
const Middleware = require('../middleware/Auth');

router.get('/create',Middleware.requiresLogin,PostController.create);
router.post('/store',Middleware.requiresLogin,PostController.upload.single('image'),PostController.store);
router.get('/edit/:id',Middleware.requiresLogin,PostController.edit);
router.post('/update',PostController.upload.single('image'),PostController.update);
router.get('/:id',PostController.show);


module.exports = router;
