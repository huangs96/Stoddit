import './Message.css';
import React, { useState, useEffect } from 'react';
import { getMessages } from '../../../services/chat.service';

function Message({chatroomKey, userID, userIMG}) {
  const [messages, setMessages] = useState('');
  const [waitData, setWaitData] = useState(true);
  // console.log('ck', chatroomKey)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessages(chatroomKey);
      // console.log('data---', data);
      setMessages(data);
      setWaitData(false);
    }
    fetchData()
    .catch(console.error)
  }, [chatroomKey])
  // console.log('messages', messages);

  return (
    <>
    <div>
      {!waitData &&
        messages.map((data, i) => {
          if (userID === data.account_id) {
            data.ownMessage = true;
          } else {
            data.ownMessage = false;
          };
          return (
            <div className={data.ownMessage ? "message own" : "message"}> 
              <div className="messageTop">
              <img 
                className="messageImg" 
                src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                alt=""
              />
              <p className="messageText" key={i}>{data.message_text}</p>
            </div>
            <div className="messageBottom"key={i}>{data.sent_datetime}</div>
            </div>
          )
        })
      }
    </div>
    </>
  )
}

export default Message