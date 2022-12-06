import React from 'react'
import './Message.css';

function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img 
          className="messageImg" 
          src="https://i.ibb.co/yNbJ9N4/IMG-9300.jpg" 
          alt=""
        />
        <p className="messageText">Hello this is a message</p>
      </div>
      <div className="messageBottom">1 Hour Ago</div>
    </div>
  )
}

export default Message