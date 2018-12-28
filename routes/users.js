var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');


router.post('/store',UserController.store);

module.exports = router;
