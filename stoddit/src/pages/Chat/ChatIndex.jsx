import './ChatIndex.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Conversation from './Conversations/Conversation';
import Message from './Messages/Message';
import FriendsOnline from './ChatOnline/FriendsOnline';
import { getUser } from '../../services/home.service';
import addMessageToConversation from '../../contexts/chatContext';

function ChatIndex() {
  //variables for user
  const [user, setUser] = useState('');
  //variables for messages
  const [participant, setParticipant] = useState('');
  const [message, setMessage] = useState('');
  let timestamp = new Date();
  //variables for chatrooms
  const [userID, setUserID] = useState('');
  const waitForData = (user !== '');
  const [chatroomKey, setChatroomKey] = useState('');

  //get corresponding messages from conversations file
  const getChatroomKey = (key) => {
    setChatroomKey(key);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUser(data.user.username);
      setUserID(data.user.id)
    }
    fetchData()
    .catch(console.error)
  }, []);

  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessage(message);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('message', message);
    addMessageToConversation(user, message, timestamp);
  }


  return (
    <>
    {waitForData &&
      <div style={{ marginTop:'10vh'}} className="chat">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <TextField className="chatMenuInput" label="Search Chats, Friends, or Users">
            </TextField>
            <Conversation getChatroomKey={getChatroomKey}/>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message userID={userID} chatroomKey={chatroomKey} />
            </div>
              <div className="chatBoxBottom">
                <form onSubmit={handleSubmit}>
                  <TextField 
                    name="message"
                    className="chatMessageInput" 
                    size="large" 
                    placeholder="Send a message.."
                    onChange={onChangeMessage}
                    value={message}
                  />
                <Button type="submit" variant="contained" className="chatSubmitButton" endIcon={<SendIcon />}>Send</Button>
                </form>
              </div>
          </div>
        </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <FriendsOnline />
            </div>
          </div>
      </div>
    }
    </>
  )
}

export default ChatIndex