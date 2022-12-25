import './ChatIndex.css';
import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Conversation from './Conversations/Conversation';
import Message from './Messages/Message';
import FriendsOnline from './ChatOnline/FriendsOnline';
import { getUser } from '../../services/home.service';
import { addMessageToConversation } from '../../contexts/chatContext';
import { 
  getParticipantIDFromChatroomID,
  getParticipantIDFromAccountID, 
  getMessagesByChatroomID,
  getChatroomByUserID
} from '../../services/chat.service';
import { SocketProvider } from '../../contexts/socketProvider';
import { io } from 'socket.io-client';


/* ------ Socket Connection ------ */
const socket = io('http://localhost:5000', {
  withCredentials: true,
});
/* ------ Socket End ------ */

function ChatIndex() {
  //variables for user
  const [username, setUsername] = useState('');
  const waitForData = (username !== '');
  const [userID, setUserID] = useState('');
  //variables for messages
  const [participantID, setParticipantID] = useState('');
  const [messages, setMessages] = useState('');
  const [messageText, setMessageText] = useState('');
  const [addNewMessage, setAddNewMessage] = useState('');
  const timestamp = new Date();
  const bottomRef = useRef(null);
  //variables for chatrooms
  const [chatroomKey, setChatroomKey] = useState('');
  const [conversations, setConversations] = useState('');

  
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUser();
      setUsername(data.user.username);
      setUserID(data.user.id);
      const chatroomData = await getChatroomByUserID(data.user.id);
      setConversations(chatroomData);
    };

    // const fetchChatroomData = async (userID) => {
    //   const chatroomData = await getChatroomByUserID(userID);
    //   setConversationData(chatroomData);
    // };

    fetchUserData()
    .catch(console.error);

    // //on socket connection
    // socket.on('connection', () => {
    //   console.log('working');
    // });
    // //console message from socket
    // socket.on('message', message => {
    //   console.log("ChatIndex: socket", message);
    // });

    // return () => {
    //   socket.off('chatMessage');
    // };

  }, []);
  console.log('user chatIndex', userID);
  console.log('chatroomData chatindex', conversations);

  useEffect(() => {
    const fetchMessageData = async () => {
      const messageData = await getMessagesByChatroomID(chatroomKey);
      setMessages(messageData);
    };
  }, []);

  //get corresponding messages from conversations file
  const getChatroomKey = (key) => {
    setChatroomKey(key);
  };
  console.log('key chatIndex', chatroomKey);


  //get participant id of user from chatroom
  if(chatroomKey) {
    const fetchParticipantDataFromChatroomID = async (chatroomKey) => {
      const data = await getParticipantIDFromChatroomID(chatroomKey);
      data.map(values => {
        //if current user id matches account_id in chatroom, set the participant id
        if(userID === values.account_id) {
          setParticipantID(values.id);
        };
      });
    };
    fetchParticipantDataFromChatroomID(chatroomKey);
  };


  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessageText(message);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText) {
      addMessageToConversation(participantID, messageText, timestamp);
    };

    // //emit message to server
    // socket.emit('chatMessage', message);

    // //emit message back to frontend
    // socket.on('chatMessage', chatMessage => {
    //   setAddNewMessage(chatMessage);
    // });

    //empty textbox
    setMessageText('');
  };

  return (
    <>
    {/* <SocketProvider chatroom_id={chatroomKey}> */}
    {waitForData &&
      <div style={{ marginTop:'10vh'}} className="chat">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <TextField className="chatMenuInput" label="Search Chats, Friends, or Users">
            </TextField>
            <Conversation getChatroomKey={getChatroomKey} conversations={conversations}/>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message userID={userID} chatroomKey={chatroomKey} addNewMessage={addNewMessage}/>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="chatBoxBottom">
                  <TextField 
                    name="message"
                    className="chatMessageInput" 
                    size="large" 
                    placeholder="Send a message.."
                    onChange={onChangeMessage}
                    value={messageText}
                  />
                <Button type="submit" variant="contained" className="chatSubmitButton" endIcon={<SendIcon />}>Send</Button>
              </div>
            </form>
          </div>
        </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <FriendsOnline userID={userID}/>
            </div>
          </div>
      </div>
    }
    {/* </SocketProvider> */}
    </>
  )
}

export default ChatIndex