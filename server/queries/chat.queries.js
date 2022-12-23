/* ------ Chatroom ------ */
const getChatroom = "SELECT * FROM chatroom";
const getChatroomByChatroomID = "SELECT * FROM chatroom WHERE id = $1";
const getChatroomByUserID = "SELECT participant.account_id, chatroom.name, participant.chatroom_id FROM participant INNER JOIN chatroom ON participant.chatroom_id=chatroom.id WHERE account_id = $1"
const createChatroom = "INSERT INTO chatroom (name, title, description) VALUES ($1, $2, $3) returning id";
const deleteChatroom = "DELETE FROM chatroom WHERE chatroom_id = $1 returning id";
/* -------------------------------- */

/* ------ Participant ------ */
const getParticipant = "SELECT * FROM participant";
const getParticipantFromChatroomID = "SELECT * FROM (SELECT * FROM participant WHERE chatroom_id = $1) chatroom";
const getParticipantFromAccountID = "SELECT * FROM participant WHERE account_id = $1";
const createParticipantFromChatroom = "INSERT INTO participant (chatroom_id, account_id, joined_datetime, left_datetime) VALUES ($1, $2, $3, $4)";
/* -------------------------------- */


/* ------ Message ------ */
const getMessage = "SELECT * FROM message";
const getMessagesByChatroom = "SELECT message.message_text, participant.chatroom_id, message.participant_id, message.sent_datetime, participant.account_id FROM message INNER JOIN participant ON message.participant_id=participant.id WHERE chatroom_id = $1";
const createMessage = "INSERT INTO message (participant_id, message_text, sent_datetime) VALUES ($1, $2, $3)";
/* -------------------------------- */

/* ------ Friend_list ------ */
const getFriendsList = "SELECT * FROM friend_list";
const getFriendsListByUser = "SELECT * FROM friend_list WHERE account_id = $1";
const getUserIDfromFriendListName = "SELECT id FROM account WHERE username = $1";
const addFriend = "";
const deleteFriend = "";
/* -------------------------------- */

module.exports = {
  //chatroom
  getChatroom,
  getChatroomByChatroomID,
  getChatroomByUserID,
  createChatroom,
  //participant
  getParticipant,
  createParticipantFromChatroom,
  getParticipantFromAccountID,
  getParticipantFromChatroomID,
  //message
  getMessage,
  getMessagesByChatroom,
  createMessage,
  //friend_list
  getFriendsList,
  getFriendsListByUser,
  getUserIDfromFriendListName

}
