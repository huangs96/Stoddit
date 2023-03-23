const { Router } = require('express');
const controller = require('../controllers/ticker.controller');
const router = Router();

router.get('/', controller.getTickers);

module.exports = router;