import './Conversation.css';
import React, { useEffect, useState } from 'react';
import { getChatroomByUserID, deleteParticipantFromChatroom} from '../../../services/chat.service';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

  console.log(conversation)

  return (
    <>
      <div className="conversationContainer">
        <div
          className="conversation"
        >
          <img 
              className="conversationImg" 
              src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' 
              alt="" 
            />
            <div className="conversationInfoContainer">
              <span 
                className="conversationName" 
              >
                {conversation.name}
              </span>
              {conversation.description.length > 0 &&
              <>
                <span
                  STYLE="font-size: 10pt; padding: 12px 3px 12px 0px"
                >
                  {conversation.description}
                </span>
                <span
                  STYLE="font-size: 8pt; color: gray"
                >
                  {conversation.description}
                </span>
              </>
              }
            </div>
        </div>
            <DeleteOutlinedIcon sx={{ "&:hover": { color: "red" } }} onClick={deleteConversation}/>
      </div>
    </>
  )
}

export default Conversation