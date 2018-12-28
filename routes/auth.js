var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');
const Middleware = require('../middleware/Auth');

router.get('/logout',AuthController.logout);
router.get('/login',Middleware.requiresLogout,AuthController.login);
router.post('/login',AuthController.loginData);

router.get('/register',Middleware.requiresLogout,AuthController.register);

module.exports = router;
