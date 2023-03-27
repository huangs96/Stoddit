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
  const ticker_id = req.body.ticker_id;
  const current_price = req.body.current_price;
  const high_price = req.body.high_price;
  const low_price = req.body.low_price;
  const recommendation = req.body.recommendation;
  const volume = req.body.volume;

  try {
    const newTicker = await client.query(queries.insertTimeIntervalToTicker, [ticker_id, current_price, high_price, low_price, recommendation, volume]);
    console.log('newTicker', newTicker);
    if (newTicker.rows) {
      res.status(201).json('New Ticker has been added');
    }
  } catch (err) {
    return res.status(400).send(err);
  };
});
//!!!! This controller is created to automate the ticker generation to demonstrate real-time ticker data - irrelevant with realtime API data
const insertTickerByTimeSetInterval = (async (req, res) => {
  const ticker_id = req.body.ticker_id;
  const current_price = req.body.current_price;
  const high_price = req.body.high_price;
  const low_price = req.body.low_price;
  const recommendation = req.body.recommendation;
  const volume = req.body.volume;
  const tickerIntervalData = [];

  try {
    tickerLogic.tickerDataRandomizer();
    const tickerData = await client.query(queries.getAllTickers);
    if (tickerData.rows) {
      for (let ticker of tickerData.rows) {
        const chatroom_id = ticker.chatroom_id;
        console.log('ticker_id', ticker_id);
        const getTickerIntervalData = await client.query(queries.getTickersByChatroomID, [chatroom_id]);
        if (getTickerIntervalData.rows.length > 0) {
          tickerIntervalData.push(getTickerIntervalData.rows);
        };
      };
    };
    
    if (tickerIntervalData.length > 0) {
      for (let ticker of tickerIntervalData) {
        tickerLogic.tickerDataRandomizer(ticker);
      };
    };


    // const newTicker = await client.query(queries.insertTimeIntervalToTicker, [ticker_id, current_price, high_price, low_price, recommendation, volume]);
    // console.log('newTicker', newTicker);
    // if (newTicker.rows) {
    //   res.status(201).json('New Ticker has been added');
    // }
  } catch (err) {
    return res.status(400).send(err);
  };
});

module.exports = {
  //Get
  getTickers,
  getTickersByChatroomID,
  //Insert
  insertTickerByTimeInterval,
  insertTickerByTimeSetInterval
};