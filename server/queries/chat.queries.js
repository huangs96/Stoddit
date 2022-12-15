/* ------ Chatroom ------ */
const getChatroom = "SELECT * FROM chatroom";
const getChatroomById = "SELECT * FROM chatroom WHERE id = $1";
const createChatroom = "INSERT INTO chatroom (name, title, description) VALUES ($1, $2, $3) returning id";
const deleteChatroom = "DELETE FROM chatroom WHERE chatroom_id = $1 returning id";
/* -------------------------------- */

/* ------ Participant ------ */
const getParticipant = "SELECT * FROM participant";
const createParticipantFromChatroom = "INSERT INTO participant (chatroom_id, account_id, joined_datetime, left_datetime) VALUES ($1, $2, $3, $4)";
const getParticipantFromChatroomID = "SELECT * FROM (SELECT * FROM participant WHERE chatroom_id = $1) chatroom";
/* -------------------------------- */


/* ------ Message ------ */
const getMessage = "SELECT * FROM message";
const getMessagesByChatroom = "SELECT message.message_text, participant.chatroom_id, message.participant_id, message.sent_datetime FROM message INNER JOIN participant ON message.participant_id=participant.id WHERE chatroom_id = $1";
const createMessage = "INSERT INTO message (participant_id, message_text, sent_datetime) VALUES ($1, $2, $3)";
/* -------------------------------- */

/* ------ Friend_list ------ */
const getFriendsList = "SELECT * FROM friend_list";
/* -------------------------------- */

module.exports = {
  //chatroom
  getChatroom,
  getChatroomById,
  createChatroom,
  //participant
  getParticipant,
  createParticipantFromChatroom,
  //message
  getMessage,
  getMessagesByChatroom,
  createMessage,
  //friend_list
  getFriendsList

}
