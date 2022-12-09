import './Conversation.css';
import React, { useState } from 'react';
import { getChatrooms, getMessages } from '../../../services/chat.service';
import { Button, Modal, Typography, Box } from '@mui/material';
import NewConversation from './newConversation';

function Conversation(username, userID) {
  const [chatroomID, setChatroomID] = useState('');
  //set state for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  let sortConversations = {};

  const messageData = getMessages();
  
  const sortMessageData = messageData.map(data => {
    let textMessages = data.text;
    let chatroomID = data.chatroom_id;
    //if conversation id has not been added to sortConversations object, create chatroomID:[] pair
    if(!sortConversations[chatroomID]){
      sortConversations[chatroomID] = [];
    }
    //get keys from sortConversations and match with chatroomIDs
    let x = Object.keys(sortConversations)
    let y = chatroomID.toString();
    //if keys match chatroom, push message into array
    if (x[x.length-1] === y) {
      sortConversations[chatroomID].push(textMessages);
    }
  })


  console.log(sortConversations);

  const chatrooms = getChatrooms();
  const displayChatrooms = chatrooms.map(function(item, i) {
    return <div className="conversation" onClick={handleClose}>
    <img className="conversationImg" src="https://i.ibb.co/yNbJ9N4/IMG-9300.jpg" alt=""/>
    <span className="conversationName" key={i}>{item.name}</span>
    </div>
  });
  return (
    <>
      <div>
        <h3>
          {username.username}'s Conversations
        </h3>
        {displayChatrooms}
      </div>
      <div>
      <Button onClick={handleOpen} variant="contained">New Conversation</Button>
      <NewConversation
        open={open}
        onClose={handleClose}
      />
      </div>
    </>
  )
}

export default Conversation