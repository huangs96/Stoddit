import './FriendsOnline.css';
import React from 'react';
import { getFriendsList } from '../../../services/chat.service';

const friendsList = getFriendsList();
const displayFriendsList = friendsList.map((friends, i) => {
  return <div className="friendsOnline">
    <div className="chatOnlineFriend">
      <div className="friendOnlineImgContainer">
        <img
        className="friendsOnlineImg"
        src={friends.img}
        alt=""
        />
        <div className="chatOnlineBadge"></div>
      </div>
      <span className="onlineFriendName" key={i}>{friends.username}</span>
    </div>
  </div>
});



function FriendsOnline() {
  return (
    <>
      <div>
        {displayFriendsList}
      </div>
    </>
  );
}

export default FriendsOnline