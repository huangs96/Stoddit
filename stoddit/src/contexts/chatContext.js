import {sendMessage} from '../services/chat.service';

const addMessageToConversation = async (participantID, text, time) => {
  console.log(participantID, text, time);
  //insert message into database to refresh and get new message
  let messageData = {
    id: participantID,
    text: text,
    sent_datetime: time,
    img: ''
  };

  console.log((messageData));
  // await sendMessage(messageData);
  
  
  
}

// const sendMessage = (participant, text, time) => {

// }

export default addMessageToConversation;