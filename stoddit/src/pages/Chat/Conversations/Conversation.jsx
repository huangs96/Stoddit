import './Conversation.css';
import React from 'react';
import { getFriendsList } from '../../../services/chat.service';

function Conversation(username) {

  const friendsList = getFriendsList();
  console.log(friendsList);

  return (
    <>
      <div>
        <h3>
          {username.username}'s Conversations
        </h3>
        {friendsList.map(function(item, i) {
          return <div className="conversation">
          <img className="conversationImg" src="https://i.ibb.co/yNbJ9N4/IMG-9300.jpg" alt=""/>
          <span className="conversationName" key={i}>{item.username}</span>
          </div>
        }
        )}
      </div>
    </>
  )
}

export default Conversation