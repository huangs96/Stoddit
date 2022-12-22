const { Router } = require('express');
const controller = require('../controllers/chat.controller');
const router = Router();


/* ------ Chatroom Routes ------ */
router.get('/chatroom', controller.getChatroom);
router.get('/chatroom/:id', controller.getChatroomByChatroomID);
router.get('/chatroom/user/:id', controller.getChatroomByUserID);
router.post('/createchatroom', controller.createChatroom);
/* -------------------------------- */


/* ------ Participant Routes ------ */
router.get('/participant', controller.getParticipant);
router.get('/participant/chatroom/:id', controller.getParticipantFromChatroomID);
router.get('/participant/user/:id', controller.getParticipantFromAccountID);
/* -------------------------------- */


/* ------ Message Routes ------ */
router.get('/message', controller.getMessage);
router.get('/message/chatroomid=:id', controller.getMessageByChatroom);
router.post('/message/new', controller.createMessage);
/* -------------------------------- */

/* ------ Friend_list Routes ------ */
router.get('/friends', controller.getFriendsList);
router.get('/friends/:id', controller.getFriendsListById);
/* -------------------------------- */

module.exports = router;