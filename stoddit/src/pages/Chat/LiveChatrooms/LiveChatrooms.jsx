import React, {useEffect, useState} from 'react';
import { getAllLiveChatrooms } from '../../../services/chat.service';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LaptopChromebookSharpIcon from '@mui/icons-material/LaptopChromebookSharp';

function LiveChatrooms({liveChatrooms, liveChatroomKey}) {
  return (
    <>
      <div className="conversationContainer">
        <div className="conversation">
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
        </div>
      </div>
    </>
  )
}

export default LiveChatrooms