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
const insertTickerByTimeInterval = () => (async (req, res) => {
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
const insertTickerByTimeSetInterval = (io) => (async (req, res) => {
  try {
    const tickerData = await client.query(queries.getAllTickers);
    console.log('0000', tickerData.rows);
    for (let ticker=0; ticker<tickerData.rows.length; ticker++) {
      const individualTicker = tickerData.rows[ticker];
      const ticker_id = individualTicker.id;
      console.log('tickerid', ticker_id);
      const getTickerIntervalDataFromTickerID = await client.query(queries.getTickersByTickerID, [ticker_id]);
      console.log('11111', getTickerIntervalDataFromTickerID.rows[0]);
      const mostRecentIntervalTickerData = getTickerIntervalDataFromTickerID.rows[0];
      const newIntervalData = tickerLogic.tickerDataRandomizer(mostRecentIntervalTickerData);
      console.log('22222', newIntervalData);
      const realtimeIntervalData = await client.query(queries.insertTimeIntervalToTicker, [newIntervalData.ticker_id, newIntervalData.current_price, newIntervalData.high_price, newIntervalData.low_price, newIntervalData.recommendation, newIntervalData.volume]);
      console.log('3333', realtimeIntervalData.rows);

    };
    // if (tickerData.rows) {
    //   for (let ticker=0; ticker<tickerData.rows.length; ticker++) {
    //     console.log('01010101', tickerData.rows[ticker]);
    //     const ticker_id = ticker.id;
    //     console.log('01010101id', ticker_id);
    //     // const getTickerIntervalDataFromTickerID = await client.query(queries.getTickersByTickerID, [ticker_id]);
    //     // console.log('111111', getTickerIntervalDataFromTickerID.rows);
    //     if (getTickerIntervalDataFromTickerID.rows.length > 0) {
    //       const recentTickerData = getTickerIntervalData.rows[0];
    //       console.log('recentTickerData', recentTickerData);
    //       const newIntervalData = tickerLogic.tickerDataRandomizer(recentTickerData);
    //       console.log('newData', newIntervalData);
    //       // const realtimeIntervalData = await client.query(queries.insertTimeIntervalToTicker, [newIntervalData.ticker_id, newIntervalData.current_price, newIntervalData.high_price, newIntervalData.low_price, newIntervalData.recommendation, newIntervalData.volume]);
    //       // console.log('realtimeIntervalData', realtimeIntervalData.rows);
    //       // io.emit('ticker', realtimeIntervalData);
    //     };
    //   };
    //   // res.status(201).json('New Ticker has been added in intervals');
    // };
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