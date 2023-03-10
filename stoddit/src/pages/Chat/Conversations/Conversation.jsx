import './Conversation.css';
import React, { useEffect, useState } from 'react';
import { 
  deleteParticipantFromChatroom
} from '../../../services/chat.service';
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

  const conversationImages = conversation.participantData.map(data => {
    if (data.account_id === 48) {
      data.contact_img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_CQ3IrjZcisW-FO12jxRtSA9shZYuykqA2w&usqp=CAU";
    }

    if (data.account_id === 49) {
      data.contact_img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_CQ3IrjZcisW-FO12jxRtSA9shZYuykqA2w&usqp=CAU";
    }

    if (data.account_id === 50) {
      data.contact_img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_CQ3IrjZcisW-FO12jxRtSA9shZYuykqA2w&usqp=CAU";
    }

    return data.contact_img
  });

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
                    src={conversationImages}
                    alt="" 
                  />
              </span>
              {/* <span className='avatarList'>
                  <img
                    className="conversationImg" 
                    src={conversation.contact_img}
                    alt="" 
                  />
              </span> */}
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