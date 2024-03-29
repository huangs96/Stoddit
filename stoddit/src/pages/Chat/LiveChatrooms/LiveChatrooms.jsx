import './LiveChatrooms.css';
import React, {useEffect, useState} from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function LiveChatrooms({liveChatrooms, liveChatroomKey, joinChatroom, leaveChatroom, userID, liveUsers}) {
  const [participantExist, setParticipantExist] = useState(false);
  const participantsOnline = [];

  if (liveUsers.length > 0) {
    liveChatrooms.participantData.map(participant => {
      if (liveUsers[0][participant.account_id]) {
        participantsOnline.push(participant);
      };
    });
  };
  
  useEffect(() => {
    liveChatrooms.participantData.filter(participants => {
      if (participants.account_id === userID) {
        setParticipantExist(true);
        return;
      };
    });
  }, []);

  return (
    <>
      <div
        className={liveChatroomKey === liveChatrooms.id ? "selectedLiveConversation" 
        : 
        "liveConversation"
      }
      >
        <div
          className="selectableLiveConversation"
          onClick={() => {
            setParticipantExist(true);
            joinChatroom(userID, liveChatrooms.id);
          }}
          >
          {liveChatrooms.name === 'Auto' ? 
            <>
              <span className='liveChatroomAvatar'>
                <img
                  className="liveConversationImg" 
                  src="https://images.unsplash.com/photo-1568496700509-083ddf62299c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                  alt="" 
                />
              </span>
            </>
          :
            <>
              <span className='liveChatroomAvatar'>
                <img
                  className="conversationImg" 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                  alt="" 
                />
              </span>
            </>
          }
          <div className="liveContentContainer">
            <h5
              STYLE="font-size: 10pt; color: gray"
            >
              {liveChatrooms.name}
            </h5>
            <span 
              className="conversationName" 
            >
              {liveChatrooms.description}
            </span>
              <h6 STYLE='color: gray'>
                {`${participantsOnline.length}/${liveChatrooms.participantData.length}`}
              </h6>
          </div>
        </div>
        <div className="exitLogoContainer">
          {participantExist &&
            <ExitToAppIcon
              fontSize="small"
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
      </div>
    </>
  )
}

export default LiveChatrooms