import './Message.css';
import React, { useState, useEffect, useRef } from 'react';
import { getMessages } from '../../../services/chat.service';

function Message({chatroomKey, userID, addNewMessage, userIMG}) {
  const [messages, setMessages] = useState('');
  const [waitData, setWaitData] = useState(true);
  const bottomRef = useRef(null);
  // console.log('messageFile', addNewMessage);
  // console.log(messages);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessages(chatroomKey);
      // console.log('data---', data);
      setMessages(data);
      setWaitData(false);
    }
    fetchData()
    .catch(console.error)

    bottomRef.current?.scrollIntoView({behaviour: 'smooth'});

  }, [chatroomKey, addNewMessage]);

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
      <div ref={bottomRef} />
    </div>
    </>
  )
}

export default Message