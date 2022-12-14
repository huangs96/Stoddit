import './Conversation.css';
import React, { useEffect, useState } from 'react';
import { getChatroomByUserID, deleteParticipantFromChatroom} from '../../../services/chat.service';
import { Button, Modal, Typography, Box } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function Conversation({conversation, userParticipantID, conversationDeleted}) {

  const deleteConversation = async () => {
    const participantData = {
      'userID': conversation.account_id,
      'chatroomID': conversation.chatroom_id
    };

    await deleteParticipantFromChatroom(participantData);
    console.log('user has left the chat');
    conversationDeleted();
  };

  return (
    <>
      <div className="conversationContainer">
        <div
          className="conversation"
          // onClick={handleConversation}
        >
          <img 
              className="conversationImg" 
              src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' 
              alt="" 
            />
            <span 
              className="conversationName" 
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