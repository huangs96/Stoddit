import './FriendsOnline.css';

function FriendsOnline({userID, friendsList, onlineFriends}) {
  // console.log('111', onlineFriends);
  // console.log('111222', onlineFriends.length);

  const displayFriendsList = friendsList.map((friends, i) => {

    if (friends.contact_img === null) {
      friends.contact_img = 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
    };

    if (onlineFriends.length > 1) {
      console.log('onlineFriends', onlineFriends);
      console.log(onlineFriends.length);
      console.log('it got here map1');
      onlineFriends.map(onlineFriend => {
        if (onlineFriend.userID === friends.contact_name_id) {
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
        };
      });
    } else if (friends.contact_name_id === parseInt(onlineFriends[0])) {
        console.log('check', friends.contact_name_id);
        console.log('check1', onlineFriends[0]);
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
    } else {
      return <div className="friendsOffline">
      <div className="chatOfflineFriend">
        <div className="friendOfflineImgContainer">
          <img
          className="friendsOfflineImg"
          src={friends.contact_img}
          alt=""
          />
          <div className="chatOfflineBadge"></div>
        </div>
        <span className="offlineFriendName" key={i}>{friends.contact_name}</span>
      </div>
    </div>
    };
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