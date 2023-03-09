import './Conversation.css';
import React, { useEffect, useState } from 'react';
import { deleteParticipantFromChatroom} from '../../../services/chat.service';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function Conversation({conversation, conversationDeleted}) {

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

  // console.log(conversation)

  return (
    <>
      <div className="conversationContainer">
        <div
          className="conversation"
          onMouseOver={conversationHovered}
          onMouseLeave={conversationUnhovered}
        >
          <div className="contentContainer">
            <div className="avatarContainer">
              <span className='avatarList'>
                  <img
                    className="conversationImg" 
                    src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' 
                    alt="" 
                  />
              </span>
              <span className='avatarList'>
                <img
                  className="conversationImg" 
                  src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' 
                  alt="" 
                />
              </span>  
            </div>
            <div className="conversationInfoContainer">
              <span 
                className="conversationName" 
              >
                {conversation.name}
              </span>
              <h5
                STYLE="font-size: 10pt; color: gray"
              >
                {conversation.description}
              </h5>
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