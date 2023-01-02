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
  const [receivedMessage, setReceivedMessage] = useState(null);
  const timestamp = Date.now();
  const bottomRef = useRef(null);
  //chatroom state
  const [chatroomKey, setChatroomKey] = useState('');
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState(false);
  //deleting chatroom
  const [deletedConversation, setDeletedConversation] = useState(false);
  //participants
  const [participantsInChatroom, setParticipantsInChatroom] = useState([]);
  const [senderParticipantID, setSenderParticipantID] = useState(null);
  //friends
  const [onlineFriends, setOnlineFriends] = useState([]);
  //socket
  const socket = useRef();

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
  
  const conversationDeleted = () => {
    setDeletedConversation(boolean => !boolean);
  };
  
  const getChatroomKey = (key) => {
    setChatroomKey(key);
  };

  /* --------------------------------- */

  /* ------ Socket Connection ------ */

  //run socket connection once only
  useEffect(() => {
    socket.current = io('ws://localhost:5000', {
      withCredentials: true,
    });

  }, []);

  console.log('receivedmsg', receivedMessage);

  useEffect(() => {
    socket.current.emit('liveUsers', userID);
    socket.current.on('getUsers', users => {
      // console.log('users chatIndex', users);
      setOnlineFriends(users);
    })
  }, [userID]);

  console.log('participantsinchatroom', userParticipantID);
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
      console.log('messageData chatindex', messageData);
      setReceivedMessage({
        participantID: messageData.senderID,
        messageText: messageData.text,
        timestamp: Date.now()
      });
    });

    return () => {
      socket.current.off('chatMessage');
    };
  }, [socket]);
  /* ------ Socket End ------ */

  // console.log('setRecievedMessage chatindex', receivedMessage);

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
    };
    fetchMessageData()
    .catch(console.error);
  }, [chatroomKey, deletedConversation, receivedMessage]);

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
      console.log('participantID', userParticipantID);      
      console.log('messageText', messageText);
      console.log('timestamp', timestamp);

      addMessageToConversation(userParticipantID, messageText, timestamp);
      setAddNewMessage(receivedMessage);

      const receiverID = participantsInChatroom.filter((item) => {
        return item.id !== userParticipantID;
      });
      
      console.log('participants', participantsInChatroom);
      console.log('userParticipantsID', userParticipantID);
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