import './Message.css';
import React, { useState, useEffect } from 'react';
import { getMessages } from '../../../services/chat.service';

function Message({userID}) {
  // const [id, setID] = useState('');
  // const [message, setMessage] = useState('');

  const getMessageData = getMessages();
  // console.log('messagedata----', getMessageData);
  // console.log('messageuserID---', userID);

  const displayMessage = getMessageData.map((data, i) => {
    console.log('data1---', data);
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

  
  useEffect(() => {
  },[])

  return (
    <div>
      {displayMessage}
    </div>
  )
}

export default Message