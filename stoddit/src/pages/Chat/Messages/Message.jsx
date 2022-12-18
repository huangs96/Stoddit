import './Message.css';
import React, { useState, useEffect, useRef } from 'react';
import { getMessages } from '../../../services/chat.service';

function Message({chatroomKey, userID, userIMG}) {
  const [messages, setMessages] = useState('');
  const [waitData, setWaitData] = useState(true);
  const [countMessages, setCountMessages] = useState(0);
  // console.log('ck', chatroomKey)
  let prevMessageCount = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessages(chatroomKey);
      // console.log('data---', data);
      setMessages(data);
      setCountMessages(data.length);
      setWaitData(false);
    }
    fetchData()
    .catch(console.error)

    prevMessageCount.current = countMessages;
  }, [chatroomKey, countMessages])
  // console.log('messages1111', prevMessageCount);
  // console.log('messages2222', messages);

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