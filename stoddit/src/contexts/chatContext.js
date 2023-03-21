import {sendMessage, createNewChatroom, addFriend, deleteFriend} from '../services/chat.service';

/* ------ Chatroom ------ */
const createNewChatroomWithParticipants = async (data) => {
  let chatroomBody = {
    name: data.chatroomName,
    description: data.chatroomDescription,
    userIDs: data.userIDs,
    lDate: data.lDate
  };
  let result = await createNewChatroom(chatroomBody);
  return result;
};
/* -------------------------------- */

/* ------ Participant ------ */
/* -------------------------------- */

/* ------ Message ------ */
const addMessageToConversation = async (participantData, text, receiverID, chatroomID) => {
  let body = {
    participantData: participantData,
    message_text: text,
    receiverID: receiverID,
    chatroomID: chatroomID
  };
  //insert message into database to refresh and get new message
  await sendMessage(body);
};
/* -------------------------------- */

/* ------ Friend_List ------ */
const addFriendtoFriendList = async (userID, username) => {
  let body = {
    userID: userID,
    contactName: username
  };
  addFriend(body);
};
/* -------------------------------- */



export {
  addMessageToConversation,
  createNewChatroomWithParticipants,
  addFriendtoFriendList
}