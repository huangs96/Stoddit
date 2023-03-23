import './ChatIndex.css';
import React, { 
  useState, 
  useEffect, 
  useRef,
  useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Conversation from './Conversations/Conversation';
import NewConversation from './Conversations/newConversation'
import Message from './Messages/Message';
import FriendsOnline from './ChatOnline/FriendsOnline';
import { imgExtract } from '../../contexts/userContext';
import { 
  addMessageToConversation, 
  addFriendtoFriendList
 } from '../../contexts/chatContext';
 import { SocketContext } from '../../contexts/socketProvider';
import { 
  getChatroomByUserID,
  getMessagesByChatroomID,
  getFriendsListById,
  deleteFriend
} from '../../services/chat.service';
import { getAllUsers } from '../../services/user.service';
import LiveChatrooms from './LiveChatrooms/LiveChatrooms';

function ChatIndex() {
  //user data
  const userID = JSON.parse(localStorage.getItem('UserID'));
  const username = JSON.parse(localStorage.getItem('Username'));
  //message state
  const scrollRef = useRef();
  const [userParticipantID, setUserParticipantID] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageImgLoad, setMessageImgLoad] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [realTimeMsgImgObj, setRealTimeMsgImgObj] = useState('');
  const [realtimeMessage, setRealtimeMessage] = useState(null);
  //chatroom state
  const [chatroomKey, setChatroomKey] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(undefined);
  const [conversationMembers, setConversationMembers] = useState([]);
  const [convoImgLoad, setConvoImgLoad] = useState(false);
  const [searchConversationInput, setConversationSearchInput] = useState('');
  const [newConversation, setNewConversation] = useState(false);
  //deleting chatroom
  const [userHasLeftConversation, setUserHasLeftConversation] = useState(false);
  //participants
  const [participantsInChatroom, setParticipantsInChatroom] = useState([]);
  //friendslist
  const [friendsList, setFriendsList] = useState([]);
  const [friendsImgLoad, setFriendsImgLoad] = useState(false);
  const [onlineFriendsData, setOnlineFriendsData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersInput, setAllUsersInput] = useState('');
  let searched = false;
  //socket
  const socket = useContext(SocketContext);
  //misc
  const navigate = useNavigate();

  /* ------ Socket Connection ------ */
  useEffect(() => {
    socket.on('getUsers', users => {
      let liveUsersID = Object.keys(users.users);
      if (liveUsersID.length > 1) {
        for (let liveUser of liveUsersID) {
          let liveUserInt = parseInt(liveUser);
          if (liveUserInt !== userID) {
            setOnlineFriendsData(liveUserInt);
          };
        }  
      } else {
        setOnlineFriendsData([]);
      };
    });

    socket.on('chatMessage', messageData => {
      console.log('socket', messageData.receiverID[0].id);
      setRealtimeMessage({
        message_text: messageData.text,
        participantID: messageData.receiverID[0].id,
        sent_at: new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        username: username,
        chatroomID: messageData.chatroomID
      });
    });

    return () => {
      socket.off('chatMessage');
      socket.off('getUsers');
      socket.off('getUserMessage');
      console.log('sockets returned');
    };
  }, []);

  //emit to backend which users are live
  useEffect(() => {
    socket.emit('liveUsers', userID);

    return () => {
      socket.off('liveUsers');
    };
  }, [userID]);

  /* ------ Socket End ------ */

  /* ------ Friends List ------ */
  useEffect(() => {
    let isLoaded = true;
    if (isLoaded) {
      const fetchFriendsListByID = async () => {
        const data = await getFriendsListById(userID);
        setFriendsList(data);
      };
      fetchFriendsListByID()
      .catch(console.error);      
    };
    return () => {
      isLoaded = false;
    };
  }, []);

  useEffect(() => {
    let isLoaded = true;
    if (isLoaded) {
      const loadAllUsers = async () => {
        const data = await getAllUsers();
        if (data) {
          setAllUsers(data);
        };
      };
      loadAllUsers()
      .catch(console.error);      
    };
    return () => {
      isLoaded = false;
    };
  }, []);

  //get all images once allUsers data is loaded
  useEffect(() => {
    const imgData = imgExtract(allUsers);
    setRealTimeMsgImgObj(imgData);
    const usernames = Object.keys(imgData);
    conversations.map(convos => {
      convos.participantData.map(pData => {
        usernames.map(username => {
          if (pData.username === username) {
            pData.imgUrl = imgData[username];
            setConvoImgLoad(true);
          } else if (pData.contact_img === null) {
            pData.imgUrl = 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
          };
        });
      });
    });
    friendsList.map(friends => {
      usernames.map(username => {
        if (username === friends.contact_name) {
          friends.imgUrl = imgData[username];
          setFriendsImgLoad(true);
        } else if (friends.contact_img === null) {
          friends.imgUrl = 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
        };
      });
    });
    messages.map(message => {
      usernames.map(username => {
        if (message.username === username) {
          message.imgUrl = imgData[username];
          setMessageImgLoad(true);
        } else if (message.username === null) {
          message.imgUrl = 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
        };
      });
    });
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [allUsers, conversations, friendsList, messages]);


  const addUser = async (userID, username) => {
    const newFriendID = addFriendtoFriendList(userID, username);
    setFriendsList(friends => [...friends, {
      account_id: userID,
      contact_img: null,
      contact_name: username,
      contact_name_id: newFriendID
    }]);
    onClearUserSearch();
  };

  const deleteUser = async (friendID) => {
    deleteFriend(friendID);
    setFriendsList(friends => friends.filter(friend => 
      friend.id != friendID
    ));
  };

  /* --------------------------------- */

  /* ------ Conversation Modal ------ */
  //opening and closing new conversation modal
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getNewConversation = (newChatroomID, convoName, convoDescription, selectedFriendsUsername) => {
    console.log('new chatroom ID', newChatroomID);
    console.log('new chatroom ID2222', convoName);
    console.log('new chatroom ID3333', convoDescription);
    console.log('new chatroom ID4444', selectedFriendsUsername);
    let splitChatroomReturnStr = newChatroomID.split(':');
    let newGeneratedChatroomID = parseInt(splitChatroomReturnStr[splitChatroomReturnStr.length-1]);
    if (selectedFriendsUsername.length < 2) {
      const participantData = [
        {
          username: username,
          imgUrl: realTimeMsgImgObj[username]
        },
        {
          username: selectedFriendsUsername,
          imgUrl: realTimeMsgImgObj[selectedFriendsUsername]
        }
      ]
      setConversations(convos => [...convos, {
        account_id: userID,
        name: convoName,
        chatroom_id: newGeneratedChatroomID,
        description: convoDescription,
        participantData: participantData
      }]);
    } else if (selectedFriendsUsername.length > 2) {
      const participantData = [
        {
          username: username,
          imgUrl: realTimeMsgImgObj[username]
        }
      ];
      selectedFriendsUsername.map(sFriends => {
        participantData.push({
          username: sFriends,
          imgUrl: realTimeMsgImgObj[sFriends]
        })
      });
      setConversations(convos => [...convos, {
        account_id: userID,
        name: convoName,
        chatroom_id: newGeneratedChatroomID,
        description: convoDescription,
        participantData: participantData
      }]);
    };
  };

  const conversationDeleted = () => {
    setUserHasLeftConversation(boolean => !boolean);
  };

  /* --------------------------------- */
  useEffect(() => {
    let isLoaded = true;
    const getChatroomData = async () => {
      const chatroomData = await getChatroomByUserID(userID);
      if (isLoaded && chatroomData) {
        setConversations(chatroomData);
        chatroomData.map(chatroom => {
          setChatroomKey(chatroom.chatroom_id);
        });
      };
    };
    getChatroomData()
    .catch(console.error);
    return () => {
      isLoaded = false;
    };
  }, [userHasLeftConversation]);

  useEffect(() => {
    let isLoaded = true;
    const getChatroomDataByChatroomID = async () => {
      const chatroomData = await getMessagesByChatroomID(chatroomKey);
      setMessages(chatroomData);
      conversations.map(convos => {
        if (chatroomKey === convos.chatroom_id) {
          setParticipantsInChatroom(convos.participantData);
        };
      });
    };
    if (isLoaded && chatroomKey) {
      getChatroomDataByChatroomID();
    } else {
      console.log('click conversation');
    };
    return () => {
      isLoaded = false;
      console.log('getMessagesFromChatroom returned');
    };
  }, [chatroomKey, newConversation]);

  useEffect(() => {
    if (realtimeMessage && chatroomKey === realtimeMessage.chatroomID) {
      setMessages(msgData => [...msgData, {
        message_text: realtimeMessage.message_text,
        participantID: realtimeMessage.participantID,
        sent_at: realtimeMessage.sent_at,
        username: realtimeMessage.username
      }]);
    };
  }, [realtimeMessage]);


  //Conversation Searchbar
  const getConversationSearchInput = async (e) => {
    const searchConversationInput = e.target.value;
    setConversationSearchInput(searchConversationInput.toLowerCase());
  };

  const filteredConversations = conversations.filter((convos) => {
    // console.log('convos', convos);
    if (searchConversationInput == '') {
      return convos;
    } else {
      return convos.name.toLowerCase().includes((searchConversationInput));
    };
  });

  const displayConversations = filteredConversations.map((convo) => {
    return (
      <div 
        onClick={() => {
          selectConversation(convo.chatroom_id);
          socket.emit('conversationSocket', convo.chatroom_id);
        }}
      >
        <Conversation 
          conversation={convo}
          userParticipantID={userParticipantID}
          username={username}
          conversationDeleted={conversationDeleted}
          participantData={convo.participantData}
          selectedConversation={selectedConversation}
        />
      </div>
    );
  });

  const onClearConversationSearch = async () => {
    setConversationSearchInput('');
  };

  //Friends Searchbar
  const getFriendSearchInput = async (e) => {
    const searchUserInput = e.target.value;
    setAllUsersInput(searchUserInput);
  };

  const onClearUserSearch = async () => {
    setAllUsersInput('');
  };

  const filteredUsers = allUsers.filter((users) => {
    if (allUsersInput == '') {
      searched = false;
      return allUsers;
    } else {
      searched = true;
      return users.username.toLowerCase().includes((allUsersInput));
    };
  });
  
  const selectConversation = (key) => {
    if (key) {
      setChatroomKey(key);
      setSelectedConversation(key);
    };
  };
  
  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessageText(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('sent');
    if (messageText) {
      const receiverID = participantsInChatroom.filter((item) => {
        if (item.account_id !== userID) {
          return item.id;
        };
      });

      const userParticipant = participantsInChatroom.find((item) => {
        if (item.account_id === userID) {
          setUserParticipantID(item.id);
          return item;
        };
      });

      addMessageToConversation(userParticipant, messageText, receiverID, chatroomKey);

      setMessages(msgData => [...msgData, {
        account_id: userID,
        chatroom_id: chatroomKey,
        deleted_at: null,
        message_text: messageText,
        ownMessage: true,
        participant_id: userParticipant,
        sent_at: new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        username: username,
        imgUrl: realTimeMsgImgObj[username]
      }]);
    } else {
      console.log('no message');
    };

    //empty textbox
    setMessageText('');
  };


  // console.log('userID', userID);
  // console.log('socket chatIndex', socket);
  // console.log('userParticipantID', userParticipantID);
  // console.log('participantsinChatroom', participantsInChatroom);
  // console.log('chatroomKey', chatroomKey);
  // console.log('conversations---', conversations);
  // console.log('username chatIndex', username);
  // console.log('setNewConversation---', newConversation);
  // console.log('messages', messages);
  // console.log('realtimeMsg', realtimeMessage);
  // console.log('friendsOnline ChatIndex', onlineFriendsData);
  // console.log('friendsList ChatIndex', friendsList);
  // console.log('allUsers ChatIndex', allUsers);
  // console.log('allUsersInput ChatIndex', allUsersInput);
  // console.log('displayConversations chatIndex', displayConversations);
  // console.log('filteredConversations chatIndex', filteredConversations);

  return (
    <>
      <div
      className="chat"
      >
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <div className="conversationWrapper">
            <div className="searchConversations">
              <TextField 
                className="chatMenuInput" 
                label="Search Chats and Direct Messages"
                variant="standard"
                onChange={getConversationSearchInput}
                value={searchConversationInput}
                InputProps={{
                  endAdornment: <InputAdornment>
                    <ClearIcon
                      sx={{ "&:hover": { color: "red" } }}
                      onClick={onClearConversationSearch}
                    >             
                    </ClearIcon>
                  </InputAdornment>,
                }}
              >
              </TextField>
            </div>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              aria-label="conversationTabs"
              centered
            >
            <Tab label="Direct Messages" />
            <Tab label="Live Chatrooms" />
            </Tabs>
            {value == 0 ?
              displayConversations
              :
              <>
              <LiveChatrooms>

              </LiveChatrooms>
              </>
            }
          </div>
          <div className='newConversationContainer'>
            <Button
              sx={{width: 320}}
              size="medium"
              onClick={handleOpen} 
              variant="contained"
            >
              New Conversation
            </Button>
            <NewConversation
              userID={userID}
              open={open}
              friendsList={friendsList}
              onClose={handleClose}
              getNewConversation={getNewConversation}
            />
          </div>
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
              <Message 
                userID={userID} 
                messages={messages}
                userHasLeft={userHasLeftConversation}
              />
            <div ref={scrollRef}>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="chatBoxBottom">          
              <TextField 
                name="message"
                className="chatMessageInput" 
                size="large" 
                placeholder="Send a message.."
                onChange={onChangeMessage}
                value={messageText}
              />
              <Button 
                type="submit" 
                variant="contained" 
                className="chatSubmitButton" 
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <div className="searchFriends">
              <TextField 
                className="chatMenuInput" 
                label="Search Friends or Users"
                variant="standard"
                onChange={getFriendSearchInput}
                value={allUsersInput}
                InputProps={{
                  endAdornment: <InputAdornment>
                    <ClearIcon
                      sx={{ "&:hover": { color: "red" } }}
                      onClick={onClearUserSearch}
                    >             
                    </ClearIcon>
                  </InputAdornment>,
                }}
              >
              </TextField>
            </div>
            <h4>
              Friends
            </h4>
            <FriendsOnline 
              userID={userID}
              username={username}
              friendsList={friendsList}
              onlineFriends={onlineFriendsData}
              allUsers={filteredUsers}
              searched={searched}
              getNewConversation={getNewConversation}
              addUser={addUser}
              deleteUser={deleteUser}
            />
          </div>
        </div>   
      </div>
    </>
  );
};

export default ChatIndex