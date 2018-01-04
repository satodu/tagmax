var express = require('express');
var router = express.Router();
var campaignsController = require('../campaigns/controller/campaignsController');

router.get('/', campaignsController.list);
router.get('/:id', campaignsController.show);
router.post('/', campaignsController.create);
router.put('/:id', campaignsController.update);
router.delete('/:id', campaignsController.remove);

module.exports = router;