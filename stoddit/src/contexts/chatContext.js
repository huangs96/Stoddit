import {sendMessage, createNewChatroom} from '../services/chat.service';

/* ------ Chatroom ------ */
const createNewChatroomWithParticipants = async (chatroomName, chatroomTitle, chatroomDescription, participantIDs, startDate, leaveDate) => {
  let chatroomBody = {
    name: chatroomName,
    title: chatroomTitle,
    description: chatroomDescription,
    userIDs: participantIDs,
    sDate: startDate,
    lDate: leaveDate
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



export default {
  addMessageToConversation,
  createNewChatroomWithParticipants
}