import './Conversation.css';
import React, { useState } from 'react';
import { getChatrooms, getMessages } from '../../../services/chat.service';
import { Button, Modal, Typography, Box } from '@mui/material';
import NewConversation from './newConversation';

function Conversation({getMessageData}) {
  const [chatroomID, setChatroomID] = useState('');
  //set state for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  
  //create hashmap for conversations
  let sortConversations = {};
  //get messages from database
  const messageData = getMessages();
  //sort messages into chatroom_id and messages
  messageData.map(data => {
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
  });
  //get chatroom data
  const chatrooms = getChatrooms();
  // const handleConversation = () => {
  //   let conversationIDKeys = Object.keys(sortConversations);
  //   chatrooms.map(chatroomData => {
  //     conversationIDKeys.map(chatroomIDFromHashmap => {
  //       let stringedIDfromChatrooms = chatroomData.chatroom_id.toString();
  //       if (chatroomIDFromHashmap === stringedIDfromChatrooms) {
  //         console.log('if----', chatroomData.chatroom_id);
  //       }
  //     })
  //   })
  // };
  const displayChatrooms = chatrooms.map(function(item, i) {
    const handleConversation = (getMessages) => {
      let conversationIDKeys = Object.keys(sortConversations);
      conversationIDKeys.map(keys => {
        let chatroomItems = item.chatroom_id.toString();
        if (chatroomItems === keys) {
          let chatroomMessages = Object.values(sortConversations[item.chatroom_id])
          getMessageData(chatroomMessages); 
        }
      })
    }
    return <div className="conversation" onClick={handleConversation}>
    <img className="conversationImg" src="https://i.ibb.co/yNbJ9N4/IMG-9300.jpg" alt=""/>
    <span className="conversationName" key={i}>{item.name}</span>
    </div>
  });
  return (
    <>
      <div>
        <h3>
          Conversations
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