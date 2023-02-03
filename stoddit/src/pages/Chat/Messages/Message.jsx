import './Message.css';
import React, { useRef } from 'react';
import {format} from 'timeago.js';

function Message({userID, messages}) {
  const prevMessage = useRef('');
  const bottomRef = useRef(null);

  console.log(messages);

  return (
    <>
    <div>
      {
        messages.map((data, i) => {
          if (userID === data.account_id) {
            data.ownMessage = true;
          } else {
            data.ownMessage = false;
          };
          return (
            <div className={data.ownMessage ? "message own" : "message"}> 
            <div 
                className="messageInfo"
                key={i}
              >
                <span STYLE="margin-right: 10px">
                  {data.username}
                </span>
                <span>
                  {data.sent_datetime}
                </span>
              </div>
              <div className="messageTop">
              <img 
                className="messageImg" 
                src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                alt=""
              />
              <p 
                className="messageText" 
                key={i}
              >
                {data.message_text}
              </p>
            </div>
            </div>
          )
        })
      }
      {/* {userHasLeft && */}
        <div className="leftMessage">
          {/* <p3>User has left the chat</p3> */}
        </div>
      {/* } */}
      {/* <div ref={bottomRef} /> */}
    </div>
    </>
  )
}

export default Message