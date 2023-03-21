import './Message.css';
import React, { useRef } from 'react';
import {format} from 'timeago.js';

function Message({userID, messages}) {
  const prevMessage = useRef('');
  const bottomRef = useRef(null);

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
                  {format(data.sent_at)}
                </span>
              </div>
              <div className={data.ownMessage ? "messageTop own" : "messageTop"}>
              <img 
                className="messageImg" 
                src={data.imgUrl}
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