import './Conversation.css';
import React, { useEffect, useState } from 'react';
import { 
  deleteParticipantFromChatroom
} from '../../../services/chat.service';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function Conversation({conversation, conversationDeleted, participantData, username, selectedConversation}) {
  const [hovered, setHovered] = useState(false);
  const conversationHovered = async () => {
    setHovered(true);
  };
  const conversationUnhovered = async () => {
    setHovered(false);
  };
  const deleteConversation = async () => {
    const participantData = {
      'userID': conversation.account_id,
      'chatroomID': conversation.chatroom_id
    };
    await deleteParticipantFromChatroom(participantData);
    console.log('user has left the chat');
    conversationDeleted();
  };

  const displayImg = participantData.map((data) => {
    if (data.username !== username) {
      return (
        <span className='avatarList'>
          <img
            className="conversationImg" 
            src={data.imgUrl}
            alt="" 
          />
        </span>
      );
    };
  });

  console.log('conversations', conversation.participantData.length);

  return (
    <>
      <div className="conversationContainer">
        <div
          className={selectedConversation === conversation.chatroom_id ? 'selectedConversation' : 'conversation'}
          onMouseEnter={conversationHovered}
          onMouseLeave={conversationUnhovered}
        >
          <div className="contentContainer">
              <div className="avatarContainer">
              {displayImg}
            </div>
            <div className="conversationInfoContainer">
              <span 
                className="conversationName" 
              >
                {conversation.name}
              </span>
              {conversation.participantData.length > 2 ?
                <h5
                  STYLE="font-size: 10pt; color: gray"
                >
                  {conversation.description}
                </h5>
                :
                <h5>
                  
                </h5>
              }
            </div>
          </div>
          {hovered &&
          <div className="deleteButtonContainer">
              <DeleteOutlinedIcon 
                sx={{ "&:hover": { color: "red" } }} 
                onClick={deleteConversation}
              />
          </div>
          }
        </div>
      </div>
    </>
  )
}

export default Conversation