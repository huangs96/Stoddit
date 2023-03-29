require('dotenv').config();
const client = require('../classes/pgPoolClass');
const queries = require('../queries/chat.queries');
const awsS3 = require('../classes/awsClass');

/* ------ Chatroom ------ */
// friends chat
const getChatroom = (async (req, res) => {
  try {
    const allChatrooms = await client.query(queries.getChatroom);
    if (allChatrooms.rows.length) {
      res.status(200).json(allChatrooms.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getChatroomByChatroomID = (async (req, res) => {
  const chatroom_id = parseInt(req.params.id);
  try {
    const chatroomById = await client.query(queries.getChatroomByChatroomID, [chatroom_id]);
    if (chatroomById) {
      res.status(200).json(chatroomById.rows);
    }
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getChatroomByUserID = (async (req, res) => {
  const userID = parseInt(req.params.id);
  try {
    const chatroomByUserID = await client.query(queries.getChatroomByUserID, [userID]);
    if (chatroomByUserID) {
      for (let data = 0; data < chatroomByUserID.rows.length; data++) {
        const conversationData = chatroomByUserID.rows[data];
        const participantsInChatroom = await client.query(queries.getParticipantFromChatroomID, [conversationData.chatroom_id]);
        const participantData = participantsInChatroom.rows;
        conversationData['participantData'] = participantData;
      };
      res.status(200).json(chatroomByUserID.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const createChatroom = (async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const id = req.body.userIDs;
  const lDate = req.body.lDate;
  let dataSubmit = false;

  try {
    //create chatroom
    const newChatroom = await client.query(queries.createChatroom, [name, description]);
    //chatroom query returns id of chatroom
    let chatroom_id = newChatroom.rows[0].id;
    //create participants of chatroom, if more than one id, loop through array of ids
    if (id.length > 1) {
      for (let user = 0; user < id.length; user++) {
        await client.query(queries.createParticipantFromChatroom, [chatroom_id, id[user], lDate]);
        //change dataSubmit to true to indicate successful query
        dataSubmit = true;
      };
    } else {
      await client.query(queries.createParticipantFromChatroom, [chatroom_id, id[0], lDate]);
      console.log('single conversation successfully created');
      //change dataSubmit to true to indicate successful query
      dataSubmit = true;
    };
    //if both are working, confirm creation
    if (dataSubmit) {
      res.status(201).json(`New Chatroom Created with Participants, chatroom id: ${chatroom_id}`);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const deleteChatroom = (async (req, res) => {
  const newDate = new Date();
  const deleteDate = newDate;
  const id = parseInt(req.params.id);
  
  try {
    const deleteChatroom = await client.query(queries.deleteChatroom, [deleteDate, id]);
    if(deleteChatroom) {
      res.status(200).send('Chatroom has been deleted');
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

// live chatrooms for tickers
const getLiveChatroom = (async (req, res) => {
  try {
    const allLiveChatrooms = await client.query(queries.getLiveChatroom);
    for (let x=0; x<allLiveChatrooms.rows.length; x++) {
      const chatroomData = allLiveChatrooms.rows[x];
      console.log('chatroomData', chatroomData);
      const participantData = await client.query(queries.getParticipantFromChatroomID, [chatroomData.id]);
      console.log('participantData', participantData.rows);
      chatroomData['participantData'] = participantData.rows;
    };
    if (allLiveChatrooms.rows.length) {
      res.status(200).json(allLiveChatrooms.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const joinLiveChatroom = (async (req, res) => {
  const account_id = req.body.account_id;
  const chatroom_id = req.body.chatroom_id;

  try {
    const userExists = await client.query(queries.userExistsInLiveChatroom, [account_id, chatroom_id]);
    if (userExists.rows.length > 0) {
      res.status(204).send('Participant Exists');
    } else {
      const joinedChatroom = await client.query(queries.joinLiveChatroom, [account_id, chatroom_id]);
      if (joinedChatroom) {
        res.status(200).json(`Participant joined chatroom ${chatroom_id}`);
      };
    };
  } catch (err) {
    res.status(400).send(err);
  };
});

const leaveLiveChatroom = (async (req, res) => {
  const chatroom_id = req.body.chatroom_id;
  const account_id = req.body.account_id;
  
  try {
    const leaveLiveChatroom = await client.query(queries.leaveLiveChatroom, [account_id, chatroom_id]);
    if(leaveLiveChatroom) {
      res.status(200).send(`Participant left chatroom ${chatroom_id}`);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

/* -------------------------------- */


/* ------ Participant ------ */
const getParticipant = (async (req, res) => {
  try {
    const allParticipants = await client.query(queries.getParticipant);
    if (allParticipants.rows.length) {
      res.status(200).json(allParticipants.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getParticipantFromChatroomID = (async (req, res) => {
  const chatroom_id = parseInt(req.params.id);

  try {
    const participantFromID = await client.query(queries.getParticipantFromChatroomID, [chatroom_id]);
    if (participantFromID.rows.length) {
      res.status(200).json(participantFromID.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getParticipantFromAccountID = (async (req, res) => {
  const userID = parseInt(req.params.id);

  try {
    const participantFromID = await client.query(queries.getParticipantFromAccountID, [userID]);
    if (participantFromID.rows.length) {
      res.status(200).json(participantFromID.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getUserParticipantInChatroom = (async (req, res) => {
  const userData = {
    "user_id": req.params.userid,
    "chatroom_id": req.params.chatroomid
  };

  try {
    const participantInChatroom = await client.query(queries.getUserParticipantInChatroom, [userData.user_id, userData.chatroom_id]);
    if (participantInChatroom.rows.length) {
      res.status(200).json(participantInChatroom.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const deleteParticipantFromChatroom = (async (req, res) => {
  const newDate = new Date();
  const deleteDate = newDate;
  const account_ID = req.body.userID;
  const chatroom_ID = req.body.chatroomID;
  
  try {
    const leaveChatroom = await client.query(queries.deleteParticipantFromChatroom, [deleteDate, account_ID, chatroom_ID]);
    if(leaveChatroom) {
      res.status(200).json('Chatroom has been deleted');
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});
/* -------------------------------- */

/* ------ Message ------ */
const getMessage = (async (req, res) => {
  try {
    const allMessages = await client.query(queries.getMessage);
    if (allMessages.rows.length) {
      res.status(200).json(allMessages.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getMessageByChatroom = (async (req, res) => {
  const chatroom_id = parseInt(req.params.id);
  try {
    const messagesByChatroom = await client.query(queries.getMessagesByChatroom, [chatroom_id]);
    if(messagesByChatroom) {
      return res.status(200).json(messagesByChatroom.rows);
    }
  } catch (err) {
    return res.status(400).json(err);
  };
});

//function creating a function
const createMessage = (io, users) => (async (req,res) => {
  const {participantData, message_text, receiverID, chatroomID, senderUsername} = req.body;
  console.log('message req body', req.body);
  console.log('message username', senderUsername);

  try {
    const newMessage = await client.query(queries.createMessage, [participantData.id, message_text]);
    
    if (newMessage) {
      const socketIDs = [];
      receiverID.map(data => {
        if (users.users[data.account_id] !== undefined && !socketIDs.includes(users.users[data.account_id])) {
          socketIDs.push(users.users[data.account_id]);
        };
      });
      if (socketIDs.length >= 2) {
        socketIDs.map(socketID => {    
          io.to(socketID).emit('chatMessage', {
            receiverID,
            senderID: participantData.id,
            text: message_text,
            chatroomID: chatroomID,
            senderUsername: senderUsername
          });
        });
      } else {
        io.to(socketIDs[0]).emit('chatMessage', {
          receiverID,
          senderID: participantData.id,
          text: message_text,
          chatroomID: chatroomID,
          senderUsername: senderUsername
        });
      };
      return res.status(200).json('Message successfully sent');
    };
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  };
});
/* -------------------------------- */


/* ------ Friend_list ------ */

const getFriendsListById = (async (req, res) => {
  const account_id = parseInt(req.params.id);
  try {
    const allFriendsById = await client.query(queries.getFriendsListByUser, [account_id]);
    if (allFriendsById.rows.length) {
      // for (let x=0; x<allFriendsById.rows.length; x++) {
      //   const friendDetails = allFriendsById.rows[x];
      //   console.log(friendDetails)
      //   if (friendDetails.contact_img !== null) {
      //     const url = await awsS3.getImgUrl(friendDetails.imgUrl);
      //     friendDetails.imgUrl = url;
      //   };
      // };
      res.status(200).json(allFriendsById.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getUserIDfromName = (async (req, res) => {
  let nameFromFriendList = req.params.id;
  if (nameFromFriendList.includes(',')) {
    nameFromFriendList = nameFromFriendList.split(',');
  };

  try {
    if (typeof(nameFromFriendList) === 'string') {
      const idFromName = await client.query(queries.getUserIDfromFriendListName, [nameFromFriendList]);
      if (idFromName) {
        return res.status(200).json(idFromName.rows[0].id);
      };
    } else if (nameFromFriendList.length > 1) {
      const userIDs = [];
      for (let x=0; x<nameFromFriendList.length; x++) {
        const idsFromNames = await client.query(queries.getUserIDfromFriendListName, [nameFromFriendList[x]]);
        if (idsFromNames) {
          userIDs.push(idsFromNames.rows[0].id);
        };
      };
      return res.status(200).json(userIDs);
    };
  } catch (err) {
    return res.status(400).json(err);
  };
});

const addFriend = (async (req, res) => {
  const contactName = req.body.contactName;
  const userID = req.body.userID;

  try {
    const addFriend = await client.query(queries.addFriend, [userID, contactName, userID, contactName]);
    if (addFriend) {
      return res.status(200).json(addFriend.rows[0]);
    };
  } catch (err) {
    return res.status(400).json(err);
  };
})

const deleteFriend = (async (req, res) => {
  const idOfFriend = req.params.id;
  try {
    const deleteFriend = await client.query(queries.deleteFriend, [idOfFriend]);
    if (deleteFriend) {
      return res.status(200).json(`User successfully removed from friendslist.`);
    }
  } catch (err) {
    return res.status(400).json(err);
  };
});
/* -------------------------------- */

module.exports = {
  //chatroom
  getChatroom,
  getChatroomByChatroomID,
  getChatroomByUserID,
  createChatroom,
  deleteChatroom,
  //live chatroom
  getLiveChatroom,
  joinLiveChatroom,
  leaveLiveChatroom,
  //participant
  getParticipant,
  getParticipantFromChatroomID,
  getParticipantFromAccountID,
  getUserParticipantInChatroom,
  deleteParticipantFromChatroom,
  //message
  getMessage,
  getMessageByChatroom,
  createMessage,
  //friends_list
  getFriendsListById,
  getUserIDfromName,
  addFriend,
  deleteFriend
}