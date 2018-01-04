var express = require('express');
var router = express.Router();
var authController = require('../auth/controller/authController');

router.post('/', authController.login);

module.exports = router;