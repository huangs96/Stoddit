import './FriendsOnline.css';
import React from 'react'

function FriendsOnline() {
  return (
    <div className="friendsOnline">
      <div className="chatOnlineFriend">
        <div className="friendOnlineImgContainer">
          <img 
          className="friendsOnlineImg"
          src="https://blob.sololearn.com/avatars/587fc1dd-3595-4fa0-94b8-6cf4787ce36d.jpg" alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
          <span className="onlineFriendName">Kurt Galvin</span>
      </div>
    </div>
  );
}

export default FriendsOnline