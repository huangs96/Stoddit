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

const createChatroom = (async (req, res) => {
  const {name, title, description, id} = req.body;

  try {
    //create chatroom
    const newChatroom = await client.query(queries.createChatroom, [name, title, description]);
    console.log('newchatroom', newChatroom.rows[0].id);
    let chatroom_id = newChatroom.rows[0].id;
    const newParticipantFromChatroom = await client.query(queries.createParticipantFromChatroom, [chatroom_id, id])
    if (newChatroom) {
      res.status(201).json('New Chatroom Created');
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

module.exports = {
  //chatroom
  getChatroom,
  createChatroom,
  //participant
  getParticipant,
  //message
  getMessage
}