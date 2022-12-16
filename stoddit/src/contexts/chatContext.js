import {sendMessage} from '../services/chat.service';

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


export default addMessageToConversation;