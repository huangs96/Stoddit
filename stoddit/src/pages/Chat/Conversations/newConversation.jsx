import './newConversation.css';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { getFriendsListById, createNewChatroom, getUserIDByUsername } from '../../../services/chat.service';
import { createNewChatroomWithParticipants } from '../../../contexts/chatContext';

function NewConversation(props) {
  const [conversationName, setConversationName] = useState('');
  const [conversationTitle, setConversationTitle] = useState('');
  const [conversationDescription, setConversationDescription] = useState('');
  const todaysDate = new Date();
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [conversationData, setConversationData] = useState({
    chatroomName: '',
    chatroomDescription: '',
    userIDs: [],
    sDate: todaysDate,
    lDate: null
  });

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const onChangeConversationName = (e) => {
    const conversationName = e.target.value;
    // console.log(conversationName);
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
      setSelectedFriends(friends => friends.filter((friend) => friend !== value));
    } else {
      setSelectedFriends(friends => [...friends, value])
      console.log('selectedFriends', selectedFriends);
    };
  };

  const resetConversationData = () => {
    setConversationData({
      chatroomName: '',
      chatroomDescription: '',
      userIDs: [],
      sDate: todaysDate,
      lDate: null
    });
    setConversationName('');
    setConversationTitle('');
    setConversationDescription('');
    setSelectedFriends([]);
  };


  const createConversation = async (e) => {
    //populating conversation data object
    const idFromUsername = await getUserIDByUsername(selectedFriends);
 
    if (idFromUsername.length > 1 && !conversationData.userIDs.includes(idFromUsername)) {
      idFromUsername.map((ids) => {
        conversationData.userIDs.push(ids);
      });
      conversationData.userIDs.push(props.userID);
    } else {
      conversationData.userIDs.push(idFromUsername, props.userID);
    };
    if (conversationData.userIDs.length === 2 && conversationData.userIDs.includes(props.userID)) {
      conversationData.chatroomName = selectedFriends[0];
      conversationData.chatroomDescription = '';
    } else {
      conversationData.chatroomName = conversationName;
      conversationData.chatroomDescription = conversationDescription;
    };

    
    await createNewChatroomWithParticipants(conversationData);

    props.getNewConversation();

    resetConversationData();
    handleClose();
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={style} textAlign='center'>
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
                  src={friend.imgUrl}
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
          <ListItem>
            <Button startIcon={<AddIcon />} variant="contained" color="success" autoFocus onClick={createConversation}>
                Create Conversation
            </Button>
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