const { Router } = require('express');
const controller = require('../controllers/chat.controller');

module.exports = (io) => {

  const router = Router();

  /* ------ Chatroom Routes ------ */
  router.get('/chatroom', controller.getChatroom);
  router.get('/chatroom/:id', controller.getChatroomByChatroomID);
  router.get('/chatroom/user/:id', controller.getChatroomByUserID);
  router.post('/createchatroom', controller.createChatroom);
  router.delete('/deletechatroom/:id', controller.deleteChatroom);
  /* -------------------------------- */
  
  
  /* ------ Participant Routes ------ */
  router.get('/participant', controller.getParticipant);
  router.get('/participant/chatroom/:id', controller.getParticipantFromChatroomID);
  router.get('/participant/user/:id', controller.getParticipantFromAccountID);
  router.get('/participant/user/:userid/:chatroomid', controller.getUserParticipantInChatroom);
  router.post('/leavechatroom', controller.deleteParticipantFromChatroom);
  /* -------------------------------- */
  
  
  /* ------ Message Routes ------ */
  router.get('/message', controller.getMessage);
  router.get('/message/chatroomid=:id', controller.getMessageByChatroom);
  router.post('/message/new', controller.createMessage(io));
  /* -------------------------------- */
  
  /* ------ Friend_list Routes ------ */
  router.get('/friends', controller.getFriendsList);
  router.get('/friends/:id', controller.getFriendsListById);
  router.get('/friends/user/:id', controller.getUserIDfromName);
  router.post('/friends/addfriend', controller.addFriend);
  /* -------------------------------- */

  return router;
}



// module.exports = router;
