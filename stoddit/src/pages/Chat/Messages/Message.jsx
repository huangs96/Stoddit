import './Message.css';
import React, { useState, useEffect } from 'react';
import { getMessages } from '../../../services/chat.service';

function Message({chatroomKey, userID, userIMG}) {
  //change chatroom id into integer
  let stringedChatroomKey = parseInt(chatroomKey);
  //get message details
  const getMessageData = getMessages();
  console.log("message: getmessageData===", getMessageData);
  const displayMessage = getMessageData.map(data => {
    if(stringedChatroomKey === data.chatroom_id) {
      return data;
    }
  });
  let filteredData = displayMessage.filter(n => n);
  console.log('messages: filtered data---', filteredData);
  let finalData = filteredData.map((data, i) => {
    if(userID === data.id) {
      data.ownMessage = true;
    } else {
      data.ownMessage = false;
    };
    return (
      <div className={data.ownMessage ? "message own" : "message"}> 
        <div className="messageTop">
        <img 
          className="messageImg" 
          src={data.img}
          alt=""
        />
        <p className="messageText" key={i}>{data.text}</p>
      </div>
      <div className="messageBottom"key={i}>{data.date}</div>
      </div>
    )
  });
  return (
    <>
    <div>
      {finalData}
    </div>
    </>
  )
}

export default Message