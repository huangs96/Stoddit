require('dotenv').config();
const client = require('../classes/pgPoolClass');
const queries = require('../queries/ticker.queries');
const tickerLogic = require('../services/ticker');
//GET
const getTickers = (async (req, res) => {
  try {
    const allTickers = await client.query(queries.getAllTickers);
    if (allTickers.rows.length) {
      res.status(200).json(allTickers.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getTickersByChatroomID = (async (req, res) => {
  const chatroom_id = parseInt(req.params.id);
  console.log('id', chatroom_id);
  try {
    const allTickers = await client.query(queries.getTickersByChatroomID, [chatroom_id]);
    const calculatedTickerData = tickerLogic.tickerChange(allTickers.rows);
    if (allTickers) {
      res.status(200).json(calculatedTickerData);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

//INSERT
const insertTickerByTimeInterval = (async (req, res) => {
  
});

module.exports = {
  getTickers,
  getTickersByChatroomID
};