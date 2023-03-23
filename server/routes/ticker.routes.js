const { Router } = require('express');
const controller = require('../controllers/ticker.controller');
const router = Router();

router.get('/', controller.getTickers);
router.get('/:id', controller.getTickersByChatroomID);

module.exports = router;