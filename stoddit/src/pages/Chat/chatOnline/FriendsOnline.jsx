import './FriendsOnline.css';
import React from 'react';
import { getFriendsList } from '../../../services/chat.service';

const friendsList = getFriendsList();
  console.log(friendsList);

function FriendsOnline() {
  return (
    <>
      <div>
        {friendsList.map(function(item, i){
          return <div className="friendsOnline">
          <div className="chatOnlineFriend">
            <div className="friendOnlineImgContainer">
              <img 
              className="friendsOnlineImg"
              src="https://blob.sololearn.com/avatars/587fc1dd-3595-4fa0-94b8-6cf4787ce36d.jpg" alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
              <span className="onlineFriendName" key={i}>{item}</span>
          </div>
        </div>
        })}
      </div>
    </>
  );
}

export default FriendsOnline