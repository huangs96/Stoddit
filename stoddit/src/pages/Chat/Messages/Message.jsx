import './Message.css';
import React, { useState, useEffect, useRef } from 'react';

function Message({userID, messages, addNewMessage, userIMG}) {
  const [waitData, setWaitData] = useState(false);
  const [displayMessages, setDisplayMessages] = useState([]);
  const prevMessage = useRef('');
  const bottomRef = useRef(null);

  useEffect(() => {
    setDisplayMessages(messages);

    // bottomRef.current?.scrollIntoView({behaviour: 'smooth'});
    // prevMessage.current = messages;
    // console.log(prevMessage.current);
    // console.log('addnewmsg', addNewMessage);
    // let lastMessage = prevMessage.current[prevMessage.current.length-1];
    // console.log('lastmsg---', lastMessage);


  }, []);

  console.log('messages', messages);
  console.log('ddddmessages', displayMessages);
  console.log('addnewmsg', addNewMessage);

  return (
    <>
    <div>
      {/* {!waitData &&
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
      } */}
      {/* <div ref={bottomRef} /> */}
    </div>
    </>
  )
}

export default Message