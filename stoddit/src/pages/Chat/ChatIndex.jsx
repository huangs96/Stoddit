import './ChatIndex.css';
import React, { 
  useState, 
  useEffect, 
  useRef
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
import { addMessageToConversation } from '../../contexts/chatContext';
import { 
  getChatroomByUserID,
  getParticipantIDFromChatroomID,
  getMessagesByChatroomID,
  getFriendsListById,
} from '../../services/chat.service';
import { getAllUsers } from '../../services/user.service';
import { io } from 'socket.io-client';
import LiveChatrooms from './LiveChatrooms/LiveChatrooms';

function ChatIndex() {
  //user data
  const userID = JSON.parse(localStorage.getItem('UserID'));
  const username = JSON.parse(localStorage.getItem('Username'));
  //message state
  const [userParticipantID, setUserParticipantID] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [realtimeMessage, setRealtimeMessage] = useState(null);
  const timestamp = new Date();
  const bottomRef = useRef(null);
  //chatroom state
  const [chatroomKey, setChatroomKey] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [searchConversationInput, setConversationSearchInput] = useState('');
  const [newConversation, setNewConversation] = useState(false);
  //deleting chatroom
  const [userHasLeftConversation, setUserHasLeftConversation] = useState(false);
  //participants
  const [participantsInChatroom, setParticipantsInChatroom] = useState([]);
  //friendslist
  const [friendsList, setFriendsList] = useState([]);
  const [onlineFriendsData, setOnlineFriendsData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersInput, setAllUsersInput] = useState('');
  //socket
  const socket = useRef();
  //misc
  const navigate = useNavigate();

  /* ------ Socket Connection ------ */
  //run socket connection once only

  useEffect(() => {
    socket.current = io('ws://localhost:5000', {
      withCredentials: true,
    });

    //need to get live updates of when friends are offline and online

    socket.current.on('getUsers', users => {
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

    socket.current.on('chatMessage', messageData => {
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
      socket.current.off('chatMessage');
      socket.current.off('getUsers');
      socket.current.off('getUserMessage');
      console.log('sockets returned');
    };
  }, []);

  //emit to backend which users are live
  useEffect(() => {
    socket.current.emit('liveUsers', userID);

    return () => {
      socket.current.off('liveUsers');
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
        setAllUsers(data);
      };
      loadAllUsers()
      .catch(console.error);      
    };
    return () => {
      isLoaded = false;
    };
  }, []);
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
  const getNewConversation = (newChatroomID, convoName, convoDescription) => {
    let splitChatroomReturnStr = newChatroomID.split(':');
    let newGeneratedChatroomID = parseInt(splitChatroomReturnStr[splitChatroomReturnStr.length-1]);
    setConversations(convos => [...convos, {
      account_id: userID,
      name: convoName,
      chatroom_id: newGeneratedChatroomID,
      description: convoDescription
    }]);
  };
  
  const conversationDeleted = () => {
    setUserHasLeftConversation(boolean => !boolean);
  };

  // console.log('userID', userID);
  // console.log('userParticipantID', userParticipantID);
  // console.log('participantsinChatroom', participantsInChatroom);
  // console.log('chatroomKey', chatroomKey);
  // console.log('conversations---', conversations);
  // console.log('setNewConversation---', newConversation);
  // console.log('messages', messages);
  // console.log('realtimeMsg', realtimeMessage);
  console.log('friendsOnline ChatIndex', onlineFriendsData);
  // console.log('friendsList ChatIndex', friendsList);
  console.log('allUsers ChatIndex', allUsers);
  console.log('allUsersInput ChatIndex', allUsersInput);
  /* --------------------------------- */
  useEffect(() => {
    let isLoaded = true;
    const getChatroomData = async () => {
      const chatroomData = await getChatroomByUserID(userID);
      if (isLoaded) {
        setConversations(chatroomData);
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
      if (chatroomData) {
        const participantData = await getParticipantIDFromChatroomID(chatroomKey);
        setParticipantsInChatroom(participantData);
      };
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


  }, [chatroomKey, newConversation, userHasLeftConversation]);

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
    setConversationSearchInput(searchConversationInput);
  };

  const filteredConversations = conversations.filter((convos) => {
    if (searchConversationInput == '') {
      return convos;
    } else {
      return convos.name.toLowerCase().includes((searchConversationInput));
    };
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
      return allUsers;
    } else {
      return users.contact_name.toLowerCase().includes((allUsersInput));
    };
  });

  console.log('filteredUsers ChatIndex', filteredUsers);

  
  const selectConversation = (key) => {
    if (key) {
      setChatroomKey(key);
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
        username: username
      }]);
    } else {
      console.log('no message');
    };

    //empty textbox
    setMessageText('');
  };

  return (
    <>
      <div
      className="chat"
      >
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <TextField 
            className="chatMenuInput" 
            label="Search Chats and Direct Messages"
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
            filteredConversations.map((convo) => (
              <div 
                onClick={() => {
                  selectConversation(convo.chatroom_id);
                  socket.current.emit('conversationSocket', convo.chatroom_id);
                }}
              >
                <Conversation 
                  conversation={convo}
                  userParticipantID={userParticipantID}
                  conversationDeleted={conversationDeleted}
                />
              </div>
            ))
            :
            <>
            <LiveChatrooms>

            </LiveChatrooms>
            </>
          }
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
            <TextField 
              className="chatMenuInput" 
              label="Search Friends or Users"
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
            <h4>
              Friends
            </h4>
            <FriendsOnline 
              userID={userID}
              friendsList={friendsList}
              onlineFriends={onlineFriendsData}
              allUsers={filteredUsers}
            />
            <Button
              sx={{width: 320}}
              size="medium"
              onClick={handleOpen} 
              variant="contained"
            >
              Add Friends
            </Button>
          </div>
        </div>   
      </div>
    </>
  );
};

export default ChatIndex