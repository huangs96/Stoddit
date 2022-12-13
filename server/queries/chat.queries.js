//chatroom queries
const getChatroom = "SELECT * FROM chatroom";
const getChatroomById = "SELECT * FROM chatroom WHERE id = $1";
const addChatroom = "INSERT INTO chatroom (name, title, description) VALUES ($1, $2, $3)";
const deleteChatroom = "DELETE FROM chatroom WHERE "

//participant queries
const getAllParticipant = "SELECT * FROM participant";


//message queries
const getMessages = "SELECT * FROM messages";
const getMessagesByChatroom = "SELECT * FROM messages (subquery) chatroom_id = $1";
const insertMessage = "INSERT INTO message (participant_id, message_text, sent_datetime) VALUES ($1, $2, $3)";

module.exports = {
  getChatroom
}
