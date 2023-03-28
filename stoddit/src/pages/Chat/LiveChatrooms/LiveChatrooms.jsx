import React, {useEffect, useState} from 'react';
import { getAllLiveChatrooms } from '../../../services/chat.service';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LaptopChromebookSharpIcon from '@mui/icons-material/LaptopChromebookSharp';

function LiveChatrooms() {
  const [chatroomKey, setChatroomKey] = useState(null);
  const [liveChatrooms, setLiveChatrooms] = useState([]);

  useEffect(() => {
    let isLoaded = true;
    const getLiveChatrooms = async () => {
      if (isLoaded) {
        const data = await getAllLiveChatrooms();
        if (data) {
          setLiveChatrooms(data);
        };
      };
    };
    getLiveChatrooms()
    .catch(console.error);

    return () => {
      isLoaded = false;
    };
  }, []);

  const displayLiveChatrooms = liveChatrooms.map(chatrooms => {
    return (
      <div className="conversationContainer">
        <div
          className="conversation"
          onClick={() => setChatroomKey(chatrooms.id)}
        >
          <span className='avatarList'>
        </span>
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