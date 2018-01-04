var express = require('express');
var router = express.Router();
var googleParameterController = require('../google_parameters/controller/googleParameterController');

router.get('/', googleParameterController.list);
router.get('/:id', googleParameterController.show);
router.post('/', googleParameterController.create);
router.put('/:id', googleParameterController.update);
router.delete('/:id', googleParameterController.remove);

module.exports = router;