import './newConversation.css';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { getFriendsListById, createNewChatroom, getUserIDByUsername } from '../../../services/chat.service';
import { createNewChatroomWithParticipants } from '../../../contexts/chatContext';
import { getUser } from '../../../services/user.service';

function NewConversation(props) {
  const [conversationName, setConversationName] = useState('');
  const [conversationTitle, setConversationTitle] = useState('');
  const [conversationDescription, setConversationDescription] = useState('');
  const todaysDate = new Date();
  const [selectedFriends, setSelectedFriends] = useState([])
  // let selectedFriendsList = [];
  let selectedFriend = true;
  
  const startConversationData = {
    chatroomName: '',
    chatroomTitle: '',
    chatroomDescription: '',
    userIDs: [],
    sDate: todaysDate,
    lDate: null
  };

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const onChangeConversationName = (e) => {
    const conversationName = e.target.value;
    console.log(conversationName);
    setConversationName(conversationName);
  };
  
  const onChangeConversationTitle = (e) => {
    const conversationTitle = e.target.value;
    setConversationTitle(conversationTitle);
  };

  const onChangeConversationDescription = (e) => {
    const conversationDescription = e.target.value;
    setConversationDescription(conversationDescription);
  };

  const handleListItemClick = async (value) => {
    if (selectedFriends.includes(value)) {
      setSelectedFriends (friends => friends.filter((friend) => friend !== value));
    } else {
      setSelectedFriends(friends => [...friends, value])
    };
    const idFromUsername = await getUserIDByUsername(value);
    const finalIDFromUsername = idFromUsername[0].id;

    if (startConversationData.userIDs.length === 0) {
      startConversationData.userIDs.push(finalIDFromUsername);
    } else if (!startConversationData.userIDs.includes(finalIDFromUsername)) {
      startConversationData.userIDs.push(finalIDFromUsername);
    } else {
      return;
    };
  };

  const createConversation = async (e) => {
    //populating conversation data object
    startConversationData.chatroomName = conversationName;
    startConversationData.chatroomTitle = conversationTitle;
    startConversationData.chatroomDescription = conversationDescription;
    startConversationData.userIDs.push(props.userID);

    console.log(conversationName, conversationDescription, startConversationData.userIDs);

    
    let chatroomIDGenerated = await createNewChatroomWithParticipants(startConversationData);

    props.getNewConversation(chatroomIDGenerated, conversationName, conversationDescription);

    handleClose();
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={style}>
        <DialogTitle variant="h4">
          Start a Conversation
        </DialogTitle>
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
          value={conversationTitle}
          
        />
        <TextField 
          name="conversationDescription"
          className="conversationDescription"
          label="Conversation Description" 
          variant="filled" 
          size="small"
          onChange={onChangeConversationDescription}
          value={conversationDescription}
        />
        <Typography
          sx={{padding: 2}}
          variant="h6"
        >
          Select Friends to Join Conversation
        </Typography>
        <List sx={{ pt: 0 }}>
          {props.friendsList.map((friend, i) => (
            <ListItem 
              button onClick={() => handleListItemClick(friend.contact_name, i)} 
              selected={selectedFriends.includes(friend.contact_name)}
              key={i}
            >
              <ListItemAvatar>
                <Avatar
                  src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                >
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={friend.contact_name} />
              {/* {selectedFriend ?              
                <p>no</p>
                :
                <CheckIcon />
              } */}
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
      </Box>
    </Dialog>
  );
}

NewConversation.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default NewConversation;