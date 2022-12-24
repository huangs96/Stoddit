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
  getParticipantIDFromAccountID 
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
  const [user, setUser] = useState('');
  //variables for messages
  const [participantID, setParticipantID] = useState('');
  const [message, setMessage] = useState('');
  const [addNewMessage, setAddNewMessage] = useState('');
  const timestamp = new Date();
  const bottomRef = useRef(null);
  //variables for chatrooms
  const [userID, setUserID] = useState('');
  const waitForData = (user !== '');
  const [chatroomKey, setChatroomKey] = useState('');

  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUser(data.user.username);
      setUserID(data.user.id)
    };
    fetchData()
    .catch(console.error);

    //on socket connection
    socket.on('connection', () => {
      console.log('working');
    });
    //console message from socket
    socket.on('message', message => {
      console.log("ChatIndex: socket", message);
    });

    return () => {
      socket.off('chatMessage');
    };

  }, []);

  //get corresponding messages from conversations file
  const getChatroomKey = (key) => {
    setChatroomKey(key);
  };

  if(chatroomKey) {
    const fetchParticipantDataFromChatroomID = async () => {
      const data = await getParticipantIDFromChatroomID(chatroomKey);
      data.map(values => {
        if(userID === values.account_id) {
          setParticipantID(values.id);
        };
      });
    };
    fetchParticipantDataFromChatroomID();
  };


  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessage(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      addMessageToConversation(participantID, message, timestamp);
    };

    //emit message to server
    socket.emit('chatMessage', message);

    //emit message back to frontend
    socket.on('chatMessage', chatMessage => {
      setAddNewMessage(chatMessage);
    });

    console.log('chatmsg', addNewMessage);

    //empty textbox
    setMessage('');
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
            <Conversation getChatroomKey={getChatroomKey} userID={userID}/>
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
                    value={message}
                  />
                <Button type="submit" variant="contained" className="chatSubmitButton" endIcon={<SendIcon />}>Send</Button>
              </div>
            </form>
          </div>
        </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <FriendsOnline userID={48}/>
            </div>
          </div>
      </div>
    }
    {/* </SocketProvider> */}
    </>
  )
}

export default ChatIndex