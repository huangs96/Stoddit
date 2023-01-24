import {sendMessage, createNewChatroom} from '../services/chat.service';

/* ------ Chatroom ------ */
const createNewChatroomWithParticipants = async (data) => {
  let chatroomBody = {
    name: data.chatroomName,
    title: data.chatroomTitle,
    description: data.chatroomDescription,
    userIDs: data.userIDs,
    sDate: data.sDate,
    lDate: data.lDate
  };
  await createNewChatroom(chatroomBody);
};

/* -------------------------------- */

/* ------ Participant ------ */
/* -------------------------------- */

/* ------ Message ------ */
const addMessageToConversation = async (participantData, text, time, receiverID) => {
  let body = {
    participantData: participantData,
    message_text: text,
    sent_datetime: time,
    receiverID: receiverID
  };
  console.log('body', body);
  //insert message into database to refresh and get new message
  await sendMessage(body);
};
/* -------------------------------- */



export {
  addMessageToConversation,
  createNewChatroomWithParticipants
}