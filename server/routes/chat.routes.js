const { Router } = require('express');
const controller = require('../controllers/chat.controller');
const router = Router();


/* ------ Chatroom Routes ------ */
router.get('/chatroom', controller.getChatroom);
router.get('/chatroom/:id', controller.getChatroomById);
router.post('/createChatroom', controller.createChatroom);
/* -------------------------------- */


/* ------ Participant Routes ------ */
router.get('/participant', controller.getParticipant);
/* -------------------------------- */


/* ------ Message Routes ------ */
router.get('/message', controller.getMessage);
router.get('/message/chatroomid=:id', controller.getMessageByChatroom);
router.post('/message/new', controller.createMessage);
/* -------------------------------- */
module.exports = router;