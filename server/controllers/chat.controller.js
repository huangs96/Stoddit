require('dotenv').config();
const client = require('../config/db.config');
const queries = require('../queries/chat.queries');

/* ------ Chatrooms ------ */
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

const getChatroomById = (async (req, res) => {
  const chatroom_id = parseInt(req.params.id);
  try {
    const chatroomById = await client.query(queries.getChatroomById, [chatroom_id]);
    if (chatroomById) {
      res.status(200).json(chatroomById.rows);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
})

const createChatroom = (async (req, res) => {
  const {name, title, description, id, sDate, lDate} = req.body;

  try {
    //create chatroom
    const newChatroom = await client.query(queries.createChatroom, [name, title, description]);
    //chatroom query returns id of chatroom
    let chatroom_id = newChatroom.rows[0].id;
    //create participants of chatroom
    const newParticipantFromChatroom = await client.query(queries.createParticipantFromChatroom, [chatroom_id, id, sDate, lDate]);
    //if both are working, confirm creation
    if (newChatroom && newParticipantFromChatroom) {
      res.status(201).json('New Chatroom Created with Participants');
    }
  } catch (err) {
    return res.status(400).send(err);
  };
});

/* ------ Participants ------ */
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

/* ------ Messages ------ */
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
  }
})

module.exports = {
  //chatroom
  getChatroom,
  getChatroomById,
  createChatroom,
  //participant
  getParticipant,
  //message
  getMessage,
  getMessageByChatroom
}