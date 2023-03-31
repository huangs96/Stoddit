import './LiveChatrooms.css';
import React, {useEffect, useState} from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function LiveChatrooms({liveChatrooms, liveChatroomKey, joinChatroom, leaveChatroom, userID, liveUsers}) {
  const [participantExist, setParticipantExist] = useState(false);
  const liveUsersInChatroom = [];
  // console.log('chatroomKey for Live Chatrooms', liveChatroomKey);
  console.log('liveChatroomUsers', liveChatrooms.participantData);
  console.log('liveusers', liveUsers);
  useEffect(() => {
    if (liveUsers.length > 0) {
      const liveUserIDs = liveUsers[0][userID];
      if (liveUserIDs) {
        liveChatrooms.participantData.map(participant => {
          if (participant.account_id === userID) {
            console.log('participant', participant);
          };
        });
        // counter += 1;
      } else {
        console.log('false');
      };
    };
  }, [liveUsers]);

  console.log('liveUsers', liveUsersInChatroom);
  
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
        className={liveChatroomKey === liveChatrooms.id ?          "selectedLiveConversation" 
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
                {`${liveUsersInChatroom.length}/${liveChatrooms.participantData.length}`}
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