import './Conversation.css';
import React, { useEffect, useState } from 'react';
import { getChatroomByUserID, deleteParticipantFromChatroom} from '../../../services/chat.service';
import { Button, Modal, Typography, Box } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function Conversation({getChatroomKey, conversation, userParticipantID, conversationDeleted}) {

  const handleConversation = () => {
    getChatroomKey(conversation.chatroom_id);
  };

  const deleteConversation = async () => {
    await deleteParticipantFromChatroom(userParticipantID);
    conversationDeleted();
  };

  return (
    <>
      <div className="conversationContainer">
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
              // key={conversation.length}
            >
              {conversation.name}
            </span>
        </div>
            <DeleteOutlinedIcon sx={{ "&:hover": { color: "red" } }} onClick={deleteConversation}/>
      </div>
    </>
  )
}

export default Conversation