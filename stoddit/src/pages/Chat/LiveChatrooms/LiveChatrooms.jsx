import React, {useEffect, useState} from 'react';
import { getAllLiveChatrooms } from '../../../services/chat.service';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LaptopChromebookSharpIcon from '@mui/icons-material/LaptopChromebookSharp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function LiveChatrooms({liveChatrooms, liveChatroomKey, joinChatroom, leaveChatroom, userID}) {
  const [participantExist, setParticipantExist] = useState(false);
  // console.log('chatroomKey for Live Chatrooms', liveChatroomKey);
  // console.log('liveChatrooms livechatrooms', liveChatrooms);
  
  useEffect(() => {
    liveChatrooms.participantData.filter(participants => {
      if (participants.account_id === userID) {
        console.log('setParticipant should be true');
        setParticipantExist(true);
        return;
      };
    });
  }, []);

  return (
    <>
      <div className={"conversationContainer"}>
        <div 
          className={liveChatroomKey === liveChatrooms.id ?          "selectedConversation" 
          : 
          "conversation"
          }
          onClick={() => {
            setParticipantExist(true);
            joinChatroom(userID, liveChatrooms.id);
          }}
          >
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
          {participantExist &&
            <ExitToAppIcon
              sx={{
                color: 'gray',
                "&:hover": { color: "red" } 
              }} 
              onClick={() => {
                setParticipantExist(false);
                leaveChatroom(userID, liveChatrooms.id)
              }}
            />
          }
      </div>
    </>
  )
}

export default LiveChatrooms