import './Message.css';
import React, { useState, useEffect } from 'react';
import { getMessages } from '../../../services/chat.service';

function Message({messages, userID}) {
  let mappedGetMessages = [];

  const getMessageData = getMessages();
  const displayMessage = getMessageData.map((data, i) => {
    if(messages.length < 0) {
      console.log('no messages');
    }
    for (let i=0; i<messages.length; i++) {
      let value = messages[i];
    }
    // console.log(value);
    if(userID === data.id) {
      data.ownMessage = true;
    } else {
      data.ownMessage = false;
    };
  });

  
  useEffect(() => {
  },[])

  return (
    // <div className={data.ownMessage ? "message own" : "message"}>
    <div>
      <div className="messageTop">
        <img 
          className="messageImg" 
          src="" 
          alt=""
        />
        <p className="messageText" key={messages.length}>{messages}</p>
      </div>
      <div className="messageBottom"key={messages.length}>{'data.date'}</div>
    </div>
  )
}

export default Message