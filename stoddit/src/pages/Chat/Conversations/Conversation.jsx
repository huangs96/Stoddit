import './Conversation.css';
import React, { useEffect, useState } from 'react';
import { getChatroomByUserID} from '../../../services/chat.service';
import { Button, Modal, Typography, Box } from '@mui/material';
import NewConversation from './newConversation';
import { display } from '@mui/system';

function Conversation({getChatroomKey, userID}) {
  const [chatroomID, setChatroomID] = useState('');
  const [conversationData, setConversationData] = useState('');
  const [displayData, setDisplayData] = useState('');
  const [waitData, setWaitData] = useState(true);
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
      const data = await getChatroomByUserID(userID);
      setConversationData(data);
      setWaitData(false);
    }
    fetchData()
    .catch(console.error)


  }, [])
  
  //get chatroom data
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
        {!waitData && 
          conversationData.map(function (item, i) {
            const handleConversation = () => {
              console.log(item.chatroom_id);
              getChatroomKey(item.chatroom_id);
            };
            return <div className="conversation" onClick={handleConversation}>
              <img className="conversationImg" src={''} alt=""/>
              <span className="conversationName" key={i}>{item.name}</span>
            </div>
          })
        }
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