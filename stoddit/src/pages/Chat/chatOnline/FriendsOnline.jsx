import './FriendsOnline.css';
import { useEffect, useState } from 'react';
import ContextMenu from '../../../components/ContextMenu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';


function FriendsOnline({userID, username, friendsList, onlineFriends, allUsers, addUser, deleteUser, searched}) {
  const friendsListDictionary = new Map();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /* -------- Context Menu ---------*/
  const messageUser = () => {
    console.log('message function');
  };
  const deleteFriend = () => {
    deleteUser(selectedFriend);
  };
  const viewProfile = () => {
    console.log('view profile function')
  };

  const fill = {
    'Message': messageUser,
    'Delete': deleteFriend,
    'View Profile': viewProfile
  };
  
  const handleToggle = async (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    setShowContextMenu(true);
  };

  const selectFriend = async (friend) => {
    setSelectedFriend(friend.id);
  };

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener('click', handleClick);
    setAnchorEl(null);
    return () => window.removeEventListener('click', handleClick);
  }, []);
  /* ------------------------- */

  const onlineFriendsIDs = Object.keys(onlineFriends).map(IDs => {
    return parseInt(IDs);
  });

  console.log('onlineFriendsIDs', onlineFriendsIDs);

  const displayFriendsList = friendsList.map((friends, i) => {
    onlineFriendsIDs.map(onlineIDs => {
      if (friends.contact_name_id === onlineIDs) {
        friends.online = true;
        console.log('friends true', friends);
      } else if (friends.contact_name_id !== onlineIDs && onlineIDs !== userID) {
        friends.online = false;
        console.log('friends false', friends);
      };
    });

    return (
      <div className={friends.online ? "friendsOnline" : "friendsOffline"}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onContextMenu={(e) => {
            handleToggle(e);
            selectFriend(friends);
          }}
        >
        <div className={friends.online ? "chatOnlineFriend" : "chatOfflineFriend"}>
          <div className={friends.online ?"friendOnlineImgContainer" : "friendOfflineImgContainer"}>
            <img
            className={friends.online ? "friendsOnlineImg" : "friendsOfflineImg"}
            src={friends.imgUrl}
            alt=""
            />
            <div className={friends.online ? "chatOnlineBadge" : "chatOfflineBadge"}></div>
          </div>
          <span className={friends.online ? "onlineFriendName" :  "offlineFriendName"} key={i}>{friends.contact_name}</span>
        </div>
      </div>
    );
  });

  const displaySearchedUser = allUsers.map((user,i) => {
    if (!friendsListDictionary.has(user.username) && user.username != username) {
      user.alreadyFriend = false;
    } else {
      user.alreadyFriend = true;
    };

    return <div className="friendsOffline">
      <div className="chatOfflineFriend">
        <div className="friendOfflineImgContainer">
          <img
          className="friendsOfflineImg"
          src={user.imgUrl}
          alt=""
          />
        </div>
        <span className="offlineFriendName" key={i}>{user.username}</span>
      </div>
      { !user.alreadyFriend &&
      <Box
        sx={{ p: 2 }}
      >
        <AddIcon
          sx={{ "&:hover": { color: "green" } }}
          onClick={() => addUser(userID, user.username)}
        >
        </AddIcon>
      </Box>
      }
    </div>
  });
  return (
    <>
      {
        showContextMenu &&
        <div>
          <ContextMenu
            anchorEl={anchorEl}
            open={open}
            fill={fill}
          >
          </ContextMenu>
        </div>
      }
      <div>
        {!searched ?
          displayFriendsList
          :
          displaySearchedUser
        }
      </div>
    </>
  );
}

export default FriendsOnline