/* ------ Chatroom ------ */
const getChatroom = "SELECT * FROM chatroom";
const getChatroomByChatroomID = "SELECT * FROM chatroom WHERE id = $1 AND delete_date IS NULL";
const getChatroomByUserID = "SELECT participant.account_id, chatroom.name, chatroom.description, participant.chatroom_id FROM participant INNER JOIN chatroom ON participant.chatroom_id=chatroom.id WHERE account_id = $1 AND participant.deleted_at IS NULL AND chatroom.deleted_at IS NULL"
const createChatroom = "INSERT INTO chatroom (name, title, description) VALUES ($1, $2, $3) returning id";
const deleteChatroom = "UPDATE chatroom SET deleted_at = $1 WHERE id = $2;";
/* -------------------------------- */

/* ------ Participant ------ */
const getParticipant = "SELECT * FROM participant";
const getParticipantFromChatroomID = "SELECT * FROM (SELECT * FROM participant WHERE chatroom_id = $1) chatroom";
const getParticipantFromAccountID = "SELECT * FROM participant WHERE account_id = $1";
const getUserParticipantInChatroom = "SELECT id FROM participant WHERE account_id = $1 AND chatroom_id = $2";
const createParticipantFromChatroom = "INSERT INTO participant (chatroom_id, account_id, left_datetime) VALUES ($1, $2, $3)";
const deleteParticipantFromChatroom = "UPDATE participant SET deleted_at = $1 WHERE account_id = $2 AND chatroom_id = $3";
/* -------------------------------- */


/* ------ Message ------ */
const getMessage = "SELECT * FROM message";
const getMessagesByChatroom = "SELECT message.message_text, participant.chatroom_id, message.participant_id, message.sent_at, participant.account_id, chatroom.deleted_at, account.username FROM message INNER JOIN participant ON message.participant_id=participant.id INNER JOIN chatroom ON participant.chatroom_id = chatroom.id INNER JOIN account ON participant.account_id=account.id WHERE chatroom_id = $1 AND chatroom.deleted_at IS NULL ORDER BY message";
const createMessage = "INSERT INTO message (participant_id, message_text) VALUES ($1, $2)";
/* -------------------------------- */

/* ------ Friend_list ------ */
const getFriendsList = "SELECT * FROM friend_list";
const getFriendsListByUser = "SELECT friend_list.id, friend_list.account_id, friend_list.contact_name, friend_list.contact_img, account.id AS contact_name_id FROM friend_list INNER JOIN account ON friend_list.contact_name = account.username WHERE friend_list.account_id = $1;";
const getUserIDfromFriendListName = "SELECT id FROM account WHERE username = $1";
const addFriend = "INSERT INTO friend_list (account_id, contact_name) VALUES ($1, $2);";
const deleteFriend = "";
/* -------------------------------- */

module.exports = {
  //chatroom
  getChatroom,
  getChatroomByChatroomID,
  getChatroomByUserID,
  createChatroom,
  deleteChatroom,
  //participant
  getParticipant,
  createParticipantFromChatroom,
  getParticipantFromAccountID,
  getParticipantFromChatroomID,
  getUserParticipantInChatroom,
  deleteParticipantFromChatroom,
  //message
  getMessage,
  getMessagesByChatroom,
  createMessage,
  //friend_list
  getFriendsList,
  getFriendsListByUser,
  getUserIDfromFriendListName

}