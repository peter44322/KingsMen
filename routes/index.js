var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/HomeController');

router.get('/',HomeController.index);
router.get('/about',HomeController.about);

module.exports = router;
