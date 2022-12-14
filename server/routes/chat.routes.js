const { Router } = require('express');
const controller = require('../controllers/chat.controller');
const router = Router();


//Chatroom Routes
router.get('/chatroom', controller.getChatroom);

//Participant Routes
router.get('/participant', controller.getParticipant)

//Message Routes
router.get('/message', controller.getMessage)

module.exports = router;