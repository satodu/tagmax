var express = require('express');
var router = express.Router();
var companyController = require('../company/controller/companyController');

router.get('/', companyController.list);
router.get('/:id', companyController.show);
router.post('/', companyController.create);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.remove);

module.exports = router;