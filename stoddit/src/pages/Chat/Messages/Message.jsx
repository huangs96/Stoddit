import './Message.css';
import React, { useRef } from 'react';
import {format} from 'timeago.js';

function Message({userID, messages}) {
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
                <div className="nameTimestampContainer">
                  <span STYLE="margin-right: 10px">
                    {data.username}
                  </span>
                  <span className="timestamp">
                    {format(data.sent_at)}
                  </span>
                </div>
                <div 
                  className={data.ownMessage ? "messageTop own" : "messageTop"}
                  >
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
            </div>
          )
        })
      }
    </div>
    </>
  )
}

export default Message