import { getMessages } from '../services/chat.service';

const addMessageToConversation = (participantID, text, time) => {
  console.log(participantID, text, time);
  //insert message into database to refresh and get new message
  let payload = {
    id: participantID,
    text: text,
    sent_datetime: time,
    img: ''
  }
  let existingMessages = getMessages();
  console.log('chatContext: existing messages:', existingMessages);
  console.log('chatContext: participant:', participantID);
  let newMessageSent = false;
  existingMessages.map(data => {
    if (participantID === data.id) {
      console.log('chatContext: data.text', data.text);
      console.log('chatContext: new text', text);
      console.log('chatContext: payload', payload);
      if(text && text !== '') {
        newMessageSent = true;
        console.log([...existingMessages, payload]);
      }
    }
  })
}

// const sendMessage = (participant, text, time) => {

// }

export default addMessageToConversation;