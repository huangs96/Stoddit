require('dotenv').config();
const client = require('../config/db.config');
const queries = require('../queries/chat.queries');

/* ------ Chatroom ------ */
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
  }
});

const getChatroomByUserID = (async (req, res) => {
  const userID = parseInt(req.params.id);
  try {
    const chatroomByUserID = await client.query(queries.getChatroomByUserID, [userID]);
    if (chatroomByUserID) {
      res.status(200).json(chatroomByUserID.rows);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

const createChatroom = (async (req, res) => {
  const name = req.body.name;
  const title = req.body.title;
  const description = req.body.description;
  const id = req.body.userIDs;
  const sDate = req.body.sDate;
  const lDate = req.body.lDate;
  console.log('reqbody', req.body);
  let dataSubmit = false;

  console.log('id---', id);

  try {
    //create chatroom
    const newChatroom = await client.query(queries.createChatroom, [name, title, description]);
    //chatroom query returns id of chatroom
    let chatroom_id = newChatroom.rows[0].id;
    //create participants of chatroom, if more than one id, loop through array of ids
    if (id.length > 1) {
      for (let user = 0; user < id.length; user++) {
        await client.query(queries.createParticipantFromChatroom, [chatroom_id, id[user], sDate, lDate]);
        //change dataSubmit to true to indicate successful query
        dataSubmit = true;
      };
    } else {
      await client.query(queries.createParticipantFromChatroom, [chatroom_id, id, sDate, lDate]);
      console.log('single conversation successfully created');
      //change dataSubmit to true to indicate successful query
      dataSubmit = true;
    };
    //if both are working, confirm creation
    if (dataSubmit) {
      res.status(201).json('New Chatroom Created with Participants');
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

const createMessage = (async (req,res) => {
  const {participant_id, message_text, sent_datetime} = req.body;

  console.log(req.body);

  try {
    const newMessage = await client.query(queries.createMessage, [participant_id, message_text, sent_datetime]);
    if (newMessage) {
      return res.status(200).json('Message successfully sent');
    }
  } catch (err) {
    return res.status(400).json(err);
  };
});
/* -------------------------------- */


/* ------ Friend_list ------ */
const getFriendsList = (async (req, res) => {
  try {
    const allFriends = await client.query(queries.getFriendsList);
    if (allFriends.rows.length) {
      res.status(200).json(allFriends.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getFriendsListById = (async (req, res) => {
  const account_id = parseInt(req.params.id);
  try {
    const allFriendsById = await client.query(queries.getFriendsListByUser, [account_id]);
    if (allFriendsById.rows.length) {
      res.status(200).json(allFriendsById.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getUserIDfromName = (async (req, res) => {
  const nameFromFriendList = req.params.id;
  console.log(req.params.id);

  try {
    const idFromName = await client.query(queries.getUserIDfromFriendListName, [nameFromFriendList]);
    if (idFromName) {
      return res.status(200).json(idFromName.rows);
    };
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
  //participant
  getParticipant,
  getParticipantFromChatroomID,
  getParticipantFromAccountID,
  //message
  getMessage,
  getMessageByChatroom,
  createMessage,
  //friends_list
  getFriendsList,
  getFriendsListById,
  getUserIDfromName
}