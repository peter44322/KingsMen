var express = require('express');
var router = express.Router();
var PostController = require('../controllers/PostController');

router.get('/create',PostController.create);
router.post('/store',PostController.upload.single('image'),PostController.store);
router.get('/:id',PostController.show);


module.exports = router;
