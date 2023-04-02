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
  try {
    const allTickers = await client.query(queries.getTickersByChatroomID, [chatroom_id]);
    // console.log('allTickersrows', allTickers.rows);
    const calculatedTickerData = tickerLogic.tickerChange(allTickers.rows);
    console.log('calc', calculatedTickerData);
    // console.log('io', io);
    if (allTickers) {
      res.status(200).json(calculatedTickerData);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

//INSERT
const insertTickerData = (async (req, res) => {
  const ticker_id = req.body.ticker_id;
  const current_price = req.body.current_price;
  const high_price = req.body.high_price;
  const low_price = req.body.low_price;
  const recommendation = req.body.recommendation;
  const volume = req.body.volume;

  try {
    const newTicker = await client.query(queries.insertTimeIntervalToTicker, [ticker_id, current_price, high_price, low_price, recommendation, volume]);
    // console.log('newTicker', newTicker);
    if (newTicker.rows) {
      res.status(201).json('New Ticker has been added');
    }
  } catch (err) {
    return res.status(400).send(err);
  };
});

//!!!! This controller is created to automate the ticker generation to demonstrate real-time ticker data - irrelevant with realtime API data
const insertTickerByTimeSetInterval = (io) => (async () => {
    const randomGeneratedTickerData = [];
    const tickerData = await client.query(queries.getAllTickers);
    const recentTicker = {};
    console.log('io', io);
    // console.log('tickerData', tickerData);
    for (let ticker=0; ticker<tickerData.rows.length; ticker++) {
      const individualTicker = tickerData.rows[ticker];
      const chatroomIndividualTicker = await client.query(queries.getTickersByChatroomID, [individualTicker.chatroom_id]);
      // console.log('chatroomTicker', chatroomIndividualTicker.rows);
      for (x=0; x<chatroomIndividualTicker.rows.length; x++) {
        const loopedTicker = chatroomIndividualTicker.rows[x];
        if (!recentTicker[loopedTicker.name]) {
          recentTicker[loopedTicker.name] = loopedTicker;
        }
      };
    };
  const recentTickerKeys = Object.keys(recentTicker);
  // console.log('recentTickerKeys', recentTickerKeys);

  for (let x=0; x<recentTickerKeys.length; x++) {
    const randomizedTicker = tickerLogic.tickerDataRandomizer(recentTicker[recentTickerKeys[x]]);
    // console.log('222', randomizedTicker);
    const calculatedTicker = tickerLogic.tickerChange([randomizedTicker, recentTicker[recentTickerKeys[x]]]);
    randomGeneratedTickerData.push(calculatedTicker);
  };
  // console.log('rando', randomGeneratedTickerData);
  // return randomGeneratedTickerData;
});

setInterval(() => {
  insertTickerByTimeSetInterval();
}, 3000);


module.exports = {
  //Get
  getTickers,
  getTickersByChatroomID,
  //Insert
  insertTickerData,
  insertTickerByTimeSetInterval
};