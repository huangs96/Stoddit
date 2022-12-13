const { Router } = require('express');
const controller = require('../controllers/chat.controller');
const router = Router();


//Conversation routes
router.get('/', controller.getChatroom);

module.exports = router;