var express = require('express');
var router = express.Router();
var campaignsTagController = require('../campaignTag/controller/campaignsTagController');

router.get('/', campaignsTagController.list);
router.get('/:id', campaignsTagController.show);
router.post('/', campaignsTagController.create);
router.put('/:id', campaignsTagController.update);
router.delete('/:id', campaignsTagController.remove);

module.exports = router;