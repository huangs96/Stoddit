import './ChatIndex.css';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Conversation from './Conversations/Conversation';
import Message from './Messages/Message';
import FriendsOnline from './chatOnline/FriendsOnline';

function ChatIndex() {
  return (
    <div style={{ marginTop:'8vh'}} className="chat">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <TextField className="chatMenuInput" label="Search Chat">
          </TextField>
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message />
            <Message own={true}/>
            <Message />
            <Message />
            <Message />
            <Message own={true}/>
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
  )
}

export default ChatIndex