import {sendMessage, createNewChatroom} from '../services/chat.service';

/* ------ Chatroom ------ */
const createNewChatroomWithParticipants = async (data) => {
  let chatroomBody = {
    name: data.chatroomName,
    title: data.chatroomTitle,
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
const addMessageToConversation = async (participantData, text, receiverID) => {
  let body = {
    participantData: participantData,
    message_text: text,
    receiverID: receiverID
  };
  //insert message into database to refresh and get new message
  await sendMessage(body);
};
/* -------------------------------- */



export {
  addMessageToConversation,
  createNewChatroomWithParticipants
}