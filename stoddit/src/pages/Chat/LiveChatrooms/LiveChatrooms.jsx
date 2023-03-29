import React, {useEffect, useState} from 'react';
import { getAllLiveChatrooms } from '../../../services/chat.service';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LaptopChromebookSharpIcon from '@mui/icons-material/LaptopChromebookSharp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function LiveChatrooms({liveChatrooms, liveChatroomKey, leaveChatroom, userID}) {

  return (
    <>
      <div className="conversationContainer">
        <div className={liveChatroomKey === liveChatrooms.id ?"selectedConversation" : "conversation"}>
          {liveChatrooms.name === 'Auto' ? 
            <DirectionsCarIcon />
          :
           <LaptopChromebookSharpIcon />
          }
          <span 
            className="conversationName" 
          >
            {liveChatrooms.description}
          </span>
          <div className="contentContainer">
            <div className="avatarContainer">
          </div>
            <div className="conversationInfoContainer">
                <h5
                  STYLE="font-size: 10pt; color: gray"
                >
                  {liveChatrooms.name}
                </h5>
            </div>
          </div>
          {
            <ExitToAppIcon
              className="leaveChatroomIcon"
              onClick={() => {
                leaveChatroom(userID, liveChatrooms.id)
              }}
            />
          }
        </div>
      </div>
    </>
  )
}

export default LiveChatrooms