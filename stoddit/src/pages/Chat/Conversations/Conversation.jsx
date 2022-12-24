import './Conversation.css';
import React, { useEffect, useState } from 'react';
import { getChatroomByUserID } from '../../../services/chat.service';
import { Button, Modal, Typography, Box } from '@mui/material';
import NewConversation from './newConversation';

function Conversation({getChatroomKey, userID}) {
  const [conversationData, setConversationData] = useState('');
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
  
  return (
    <>
      <div>
        <h3>
          Conversations
        </h3>
        {!waitData && 
          conversationData.map(function (item, i) { 
            // console.log('item---', item);
            const handleConversation = () => {
              getChatroomKey(item.chatroom_id);
            };
            return <div className="conversation" onClick={handleConversation}>
              <img className="conversationImg" src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' alt=""/>
              <span className="conversationName" key={i}>{item.name}</span>
            </div>
          })
        }
      </div>
      <div>
      <Button onClick={handleOpen} variant="contained">New Conversation</Button>
      <NewConversation
        userID={userID}
        open={open}
        onClose={handleClose}
      />
      </div>
    </>
  )
}

export default Conversation