import React, {useEffect, useState} from 'react';
import { getAllLiveChatrooms } from '../../../services/chat.service';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LaptopChromebookSharpIcon from '@mui/icons-material/LaptopChromebookSharp';

function LiveChatrooms({liveChatrooms}) {

  const displayLiveChatrooms = liveChatrooms.map(chatrooms => {
    return (
      <div className="conversationContainer">
        <div className="conversation">
          {chatrooms.name === 'Auto' ? 
            <DirectionsCarIcon />
          :
           <LaptopChromebookSharpIcon />
          }
          <span 
            className="conversationName" 
          >
            {chatrooms.description}
          </span>
          <div className="contentContainer">
            <div className="avatarContainer">
          </div>
            <div className="conversationInfoContainer">
                <h5
                  STYLE="font-size: 10pt; color: gray"
                >
                  {chatrooms.name}
                </h5>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {displayLiveChatrooms}
    </>
  )
}

export default LiveChatrooms