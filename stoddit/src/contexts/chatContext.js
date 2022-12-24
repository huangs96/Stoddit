import {sendMessage, createNewChatroom} from '../services/chat.service';

/* ------ Chatroom ------ */
const createNewChatroomWithParticipants = async (data) => {
  console.log(data.userIDs);
  let chatroomBody = {
    name: data.chatroomName,
    title: data.chatroomTitle,
    description: data.chatroomDescription,
    userIDs: data.userIDs,
    sDate: data.sDate,
    lDate: data.lDate
  }
  console.log('data', chatroomBody);
  await createNewChatroom(chatroomBody);
};
/* -------------------------------- */

/* ------ Participant ------ */
/* -------------------------------- */

/* ------ Message ------ */
const addMessageToConversation = async (participantID, text, time) => {
  console.log('message', participantID, text, time);
  let body = {
    participant_id: participantID,
    message_text: text,
    sent_datetime: time
  };
  console.log('body---', body);
  //insert message into database to refresh and get new message
  await sendMessage(body);
}
/* -------------------------------- */



export {
  addMessageToConversation,
  createNewChatroomWithParticipants
}