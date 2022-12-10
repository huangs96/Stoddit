import './Message.css';
import React, { useState, useEffect } from 'react';
import { getMessages } from '../../../services/chat.service';

function Message({messages, userID}) {
  console.log('message in conversation', messages);
  const getMessageData = getMessages();
  // console.log('messagedata----', getMessageData);
  // console.log('messageuserID---', userID);
  const displayMessage = getMessageData.map((data, i) => {
    if(messages.length > 0) {
      messages.map(propData => {
        //extract propData values into global variable to display
        if (propData === data.text) {
          if(userID === data.id) {
            data.ownMessage = true;
          } else {
            data.ownMessage = false;
          };
        }
      })
    };

    return (
      <div className={data.ownMessage ? "message own" : "message"}>
      <div className="messageTop">
        <img 
          className="messageImg" 
          src={data.img} 
          alt=""
        />
        <p className="messageText" key={i}>{messages}</p>
      </div>
      <div className="messageBottom"key={i}>{data.date}</div>
    </div>
    )
  });

  
  useEffect(() => {
  },[])

  return (
    <div>
      {displayMessage}
    </div>
  )
}

export default Message