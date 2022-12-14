//chatroom queries
const getChatroom = "SELECT * FROM chatroom";
const getChatroomById = "SELECT * FROM chatroom WHERE id = $1";
const createChatroom = "INSERT INTO chatroom (name, title, description) VALUES ($1, $2, $3) returning id";
const deleteChatroom = "DELETE FROM chatroom WHERE "

//participant queries
const getParticipant = "SELECT * FROM participant";
const createParticipantFromChatroom = "INSERT INTO participant (chatroom_id, account_id, joined_datetime, left_datetime) VALUES ($1, $2, $3, $4)";
const getParticipantFromChatroomID = "SELECT * FROM (SELECT * FROM participant WHERE chatroom_id = $1) chatroom";


//message queries
const getMessage = "SELECT * FROM message";
const getMessagesByChatroom = "SELECT * FROM messages (subquery) chatroom_id = $1";
const insertMessage = "INSERT INTO message (participant_id, message_text, sent_datetime) VALUES ($1, $2, $3)";

module.exports = {
  //chatroom
  getChatroom,
  createChatroom,
  //participant
  getParticipant,
  createParticipantFromChatroom,
  //message
  getMessage
}
