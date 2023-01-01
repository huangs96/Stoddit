import './ChatIndex.css';
import React, { 
  useState, 
  useEffect, 
  useRef, 
  useContext 
} from 'react';
import UserContext from '../../contexts/userContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Conversation from './Conversations/Conversation';
import NewConversation from './Conversations/newConversation'
import Message from './Messages/Message';
import FriendsOnline from './ChatOnline/FriendsOnline';
import { getUser } from '../../services/user.service';
import { addMessageToConversation } from '../../contexts/chatContext';
import { 
  getChatroomByUserID,
  deleteChatroomByID,
  getParticipantIDFromChatroomID,
  getParticipantIDFromAccountID, 
  getMessagesByChatroomID,
} from '../../services/chat.service';
import { SocketProvider } from '../../contexts/socketProvider';
import { io } from 'socket.io-client';

function ChatIndex() {
  //user data
  const userID = JSON.parse(localStorage.getItem('UserID'));
  const username = JSON.parse(localStorage.getItem('Username'));
  //message state
  const [userParticipantID, setUserParticipantID] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [addNewMessage, setAddNewMessage] = useState(false);
  const timestamp = new Date();
  const bottomRef = useRef(null);
  //chatroom state
  const [chatroomKey, setChatroomKey] = useState('');
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState(false);
  //deleting chatroom
  const [deletedConversation, setDeletedConversation] = useState(false);
  //participants
  const [participantsInChatroom, setParticipantsInChatroom] = useState([]);
  //friends
  const [onlineFriends, setOnlineFriends] = useState([]);
  //socket
  const socket = useRef();

  // console.log('localstorage---', localStorage);


  /* ------ Conversation Modal ------ */
  //opening and closing new conversation modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getNewConversation = () => {
    setNewConversation(boolean => !boolean);
  };
  /* --------------------------------- */

  const conversationDeleted = () => {
    setDeletedConversation(boolean => !boolean);
  };

  const getChatroomKey = (key) => {
    setChatroomKey(key);
  };

  /* ------ Socket Connection ------ */
  // console.log('socket', socket.current);

  //run socket connection once only
  useEffect(() => {
    socket.current = io('ws://localhost:5000', {
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    socket.current.emit('liveUsers', userID);
    socket.current.on('getUsers', users => {
      // console.log('users chatIndex', users);
      setOnlineFriends(users);
    })
  }, [userID]);

  // useEffect(() => {
  //   socket.current.
  // })

  console.log('onlineFriends----', onlineFriends);

  useEffect(() => {
    socket.current.on('connection', () => {
      console.log('working');
    });
    //console message from socket
    socket.current.on('message', message => {
      // console.log("ChatIndex: socket", message);
    });

    socket.current.on('chatMessage', messageData => {
      console.log('messageData', messageData);
    });

    return () => {
      socket.current.off('chatMessage');
    };
  }, [socket]);
  /* ------ Socket End ------ */

  //load conversations
  useEffect(() => {
    const getChatroomData = async () => {
      const chatroomData = await getChatroomByUserID(userID);
      setConversations(chatroomData);
      setNewConversation(false);
    };
    getChatroomData();

    return () => {}
  }, [newConversation, deletedConversation]);


  //second useEffect to get messages based on chatroomkey
  useEffect(() => {
    const fetchMessageData = async () => {
      const messageData = await getMessagesByChatroomID(chatroomKey);
      setMessages(messageData);
      setAddNewMessage(true);
    };
    fetchMessageData()
    .catch(console.error);
  }, [chatroomKey, addNewMessage, deletedConversation]);

  //set participants based on chatroom clicked
  useEffect(() => {
    const fetchParticipantDataFromChatroomID = async (chatroomKey) => {
      const data = await getParticipantIDFromChatroomID (chatroomKey);
      // console.log('participant data', data);
      setParticipantsInChatroom(data);
    };

    //get participant id of user
    const fetchUserParticipantIDFromChatroomID = async (chatroomKey) => {
      const data = await getParticipantIDFromChatroomID(chatroomKey);
      data.map(values => {
        //if current user id matches account_id in chatroom, set the participant id
        if(userID === values.account_id) {
          setUserParticipantID(values.id);
        };
      });
    };

    fetchParticipantDataFromChatroomID(chatroomKey);
    fetchUserParticipantIDFromChatroomID(chatroomKey);
  }, [chatroomKey]);

  // console.log('user participant id', userParticipantID);

  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessageText(message);
  };

  // console.log(conversations);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText) {
      // addMessageToConversation(participantID, messageText, timestamp);
      // setAddNewMessage({participantID, messageText, timestamp});

      const receiverID = participantsInChatroom.filter((item) => {
        return item.id !== userParticipantID;
      });

      console.log('participants', participantsInChatroom);
      console.log('userParticipants', userParticipantID);
      console.log('receiverID', receiverID);

      socket.current.emit('chatMessage', ({
        senderID: userID,
        receiverID: receiverID,
        text: messageText
      }));
    } else {
      console.log('no message');
    };

    // //emit message to server
    // socket.emit('chatMessage', message);

    // //emit message back to frontend
    // socket.on('chatMessage', chatMessage => {
    //   setAddNewMessage(chatMessage);
    // });

    //empty textbox
    setMessageText('');
  }

  return (
    <>
      <div 
      style={{ marginTop:'10vh'}} 
      className="chat"
      >
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <TextField 
            className="chatMenuInput" 
            label="Search Chats, Friends, or Users"
          >
          </TextField>
          <div>
          <h2>{username}'s Conversations</h2>
          </div>
          {
            conversations.map((convo) => (
              <Conversation 
                getChatroomKey={getChatroomKey} 
                conversation={convo}
                conversationDeleted={conversationDeleted}
              />
            ))
          }
          <Button
            onClick={handleOpen} 
            variant="contained"
          >
            New Conversation
          </Button>
          <NewConversation 
            userID={userID}
            open={open}
            onClose={handleClose}
            getNewConversation={getNewConversation}
          />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message 
              userID={userID} 
              messages={messages}
              addNewMessage={addNewMessage}
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
            <FriendsOnline userID={userID}/>
          </div>
        </div>   
      </div>
    </>
  );
};

export default ChatIndex