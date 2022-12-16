import './Conversation.css';
import React, { useEffect, useState } from 'react';
import { getUser, getChatroomByID, getMessages } from '../../../services/chat.service';
import { Button, Modal, Typography, Box } from '@mui/material';
import NewConversation from './newConversation';

function Conversation({getChatroomKey, userID}) {
  const [chatroomID, setChatroomID] = useState('');
  const [conversationData, setConversationData] = useState('');
  //set state for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getChatroomByID(userID);
      setConversationData(data);
    }
    fetchData()
    .catch(console.error)
  }, [])
  
  //create hashmap for conversations
  // let sortConversations = {};
  // //get messages from database
  // const messageData = getMessages();
  // //sort messages into chatroom_ID and messages
  // messageData.map(data => {
  //   let textMessages = data.text;
  //   let chatroomID = data.chatroom_ID;
  //   //if conversation ID has not been added to sortConversations object, create chatroomID:[] pair
  //   if(!sortConversations[chatroomID]){
  //     sortConversations[chatroomID] = [];
  //   }
  //   //get keys from sortConversations and match with chatroomIDs
  //   let x = Object.keys(sortConversations)
  //   let y = chatroomID.toString();
  //   //if keys match chatroom, push message into array
  //   if (x[x.length-1] === y) {
  //     sortConversations[chatroomID].push(textMessages);
  //   }
  // });
  // //get chatroom data
  // const displayChatrooms = chatrooms.map(function(item, i) {
  //   const handleConversation = () => {
  //     let conversationIDKeys = Object.keys(sortConversations);
  //     conversationIDKeys.map(keys => {
  //       let chatroomItems = item.chatroom_ID.toString();
  //       if (chatroomItems === keys) {
  //         console.log('conversations: chatroom key', keys);
  //         getChatroomKey(keys); 
  //       }
  //     })
  //   }
  //   return <div className="conversation" onClick={handleConversation}>
  //   <img className="conversationImg" src={item.img} alt=""/>
  //   <span className="conversationName" key={i}>{item.name}</span>
  //   </div>
  // });
  return (
    <>
      <div>
        <h3>
          Conversations
        </h3>
        {conversationData}
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