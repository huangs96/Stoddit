import './ChatIndex.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Conversation from './Conversations/Conversation';
import Message from './Messages/Message';
import FriendsOnline from './chatOnline/FriendsOnline';
import { getUser } from '../../services/home.service';

function ChatIndex() {
  const [user, setUser] = useState('');
  const [userID, setUserID] = useState('');
  const waitForData = (user !== '');
  const [chatroomKey, setChatroomKey] = useState('');

  let navigate = useNavigate();

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
    console.log('user----', user);
    console.log('userID', userID);
  }, []);
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
              <TextField className="chatMessageInput" size="large" placeholder="write something.."></TextField>
              <Button variant="contained" className="chatSubmitButton">Send</Button>
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