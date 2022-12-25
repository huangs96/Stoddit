import './Conversation.css';
import React, { useEffect, useState } from 'react';
import { getChatroomByUserID } from '../../../services/chat.service';
import { Button, Modal, Typography, Box } from '@mui/material';
import NewConversation from './newConversation';

function Conversation({getChatroomKey, conversations}) {
  //set state for modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await getChatroomByUserID(userID);
    //   setConversationData(data);
    //   setWaitData(false);
    // }
    // fetchData()
    // .catch(console.error)
  }, []);
  

  const displayConversationData = () => {
    const jsxData1 = [];

    for (let data=0; data<conversations.length; data++) {
      const handleConversation = () => {
        return getChatroomKey(conversations[data].chatroom_id);
      };
      let jsxData2 = (
        <div 
          className="conversation" 
          onClick={handleConversation}
        >
          <img 
            className="conversationImg" 
            src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' 
            alt="" 
          />
          <span 
            className="conversationName" 
            key={data}
          >
            {conversations[data].name}
          </span>
        </div>
      );
      jsxData1.push(jsxData2);
    };

    return jsxData1;
  };
  

  return (
    <>
      <div>
        <h3>
          Conversations
        </h3>
        {displayConversationData()}
      </div>
      <div>
      <Button onClick={handleOpen} variant="contained">New Conversation</Button>
      <NewConversation
        userID={conversations.account_id}
        open={open}
        onClose={handleClose}
      />
      </div>
    </>
  )
}

export default Conversation