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
    // console.log('calcTickers', calculatedTickerData);
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
const insertTickerByTimeSetInterval = (async (req, res) => {
  try {
    const tickerData = await client.query(queries.getAllTickers);
    for (let ticker=0; ticker<tickerData.rows.length; ticker++) {
      const individualTicker = tickerData.rows[ticker];
      const ticker_id = individualTicker.id;
      const getTickerIntervalDataFromTickerID = await client.query(queries.getTickersByTickerID, [ticker_id]);
      const mostRecentIntervalTickerData = getTickerIntervalDataFromTickerID.rows[0];
      const newIntervalData = tickerLogic.tickerDataRandomizer(mostRecentIntervalTickerData);
      await client.query(queries.insertTimeIntervalToTicker, [newIntervalData.ticker_id, newIntervalData.current_price, newIntervalData.high_price, newIntervalData.low_price, newIntervalData.recommendation, newIntervalData.volume]);
    };
    return res.status(201).send('Ticker Data added through Intervals');
  } catch (err) {
    return res.status(400).send(err);
  };
});


// setInterval(() => {
//   intervalFunction();
// }, 5000);

module.exports = {
  //Get
  getTickers,
  getTickersByChatroomID,
  //Insert
  insertTickerData,
  insertTickerByTimeSetInterval
};