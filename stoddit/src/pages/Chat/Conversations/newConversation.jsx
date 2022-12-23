import './newConversation.css';
import {useState, useEffect} from 'react';
import { TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { getFriendsListById, createNewChatroom, getUserIDByUsername } from '../../../services/chat.service';
import createNewChatroomWithParticipants from '../../../contexts/chatContext';
import { getUser } from '../../../services/home.service';

function NewConversation(props) {
  const [friendsList, setFriendsList] = useState([]);
  const [userData, setUserData] = useState('');
  const [conversationName, setConversationName] = useState('');
  const [conversationTitle, setConversationTitle] = useState('');
  const [conversationDescription, setConversationDescription] = useState('');
  const todaysDate = new Date();
  let selectedFriend = false;
  
  const startConversationData = {
    chatroomName: '',
    chatroomTitle: '',
    chatroomDescription: '',
    userIDs: [],
    sDate: todaysDate,
    lDate: null
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFriendsListById(props.userID);
      setFriendsList(data);
    }
    fetchData()
    .catch(console.error);
    
    //get user data function

  }, [])

  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = async (value) => {
    selectedFriend = true;
    const idFromUsername = await getUserIDByUsername(value);
    console.log(idFromUsername[0].id);

    startConversationData.userIDs.push(idFromUsername[0].id);

    console.log('startConversationData', startConversationData);

    // onClose(value);
  };

  const onChangeConversationName = (e) => {
    const conversationName = e.target.value;
    setConversationName(conversationName);
  };
  // console.log(conversationName);

  const onChangeConversationTitle = (e) => {
    const conversationTitle = e.target.value;
    setConversationTitle(conversationTitle);
  };
  // console.log(conversationTitle);

  const onChangeConversationDescription = (e) => {
    const conversationDescription = e.target.value;
    setConversationDescription(conversationDescription);
  };
  // console.log(conversationDescription);


  const createConversation = (e) => {

    console.log('clicked');
    startConversationData.chatroomName = conversationName;
    startConversationData.chatroomTitle = conversationTitle;
    startConversationData.chatroomDescription = conversationDescription;
    console.log('startConversationData', startConversationData);

    createNewChatroomWithParticipants(startConversationData);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Start a Conversation</DialogTitle>
      <TextField
        name="conversationName"
        className="conversationName"
        label="Conversation Name" 
        variant="filled" 
        size="small"
        onChange={onChangeConversationName}
        value={conversationName}
      />
      <TextField 
        name="conversationTitle"
        className="conversationTitle"
        label="Conversation Title" 
        variant="filled" 
        size="small" 
        onChange={onChangeConversationTitle}
        // value={}
      />
      <TextField 
        name="conversationDescription"
        className="conversationDescription"
        label="Conversation Description" 
        variant="filled" 
        size="small"
        onChange={onChangeConversationDescription}
        // value={}
      />
      <Typography>
        Select Friends to Join Conversation
      </Typography>
      <List sx={{ pt: 0 }}>
        {friendsList.map((friend, i) => (
          <ListItem 
            selected={selectedFriend ? true : false}
            button onClick={() => handleListItemClick(friend.contact_name)} 
            key={i}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.contact_name} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={createConversation}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Create Conversation" />
        </ListItem>
      </List>
    </Dialog>
  );
}

NewConversation.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default NewConversation;