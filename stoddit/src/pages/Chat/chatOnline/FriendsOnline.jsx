import './FriendsOnline.css';
import React, { useEffect, useState } from 'react';
import { getFriendsListById } from '../../../services/chat.service';


function FriendsOnline({userID}) {
  const [friendsList, setFriendsList] = useState([]);
  console.log('friendsOnline', userID);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFriendsListById(userID);
      setFriendsList(data);
    };
    fetchData()
    .catch(console.error)
  }, []);

  console.log('friendsList', friendsList);
  const displayFriendsList = friendsList.map((friends, i) => {
    if (friends.contact_img === null) {
    friends.contact_img = 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
    };
    return <div className="friendsOnline">
      <div className="chatOnlineFriend">
        <div className="friendOnlineImgContainer">
          <img
          className="friendsOnlineImg"
          src={friends.contact_img}
          alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="onlineFriendName" key={i}>{friends.contact_name}</span>
      </div>
    </div>
  });
  return (
    <>
      <div>
        {displayFriendsList}
      </div>
    </>
  );
}

export default FriendsOnline