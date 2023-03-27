//Get
const getAllTickers = 'SELECT * FROM ticker;';
const getTickersByChatroomID = 'SELECT * FROM ticker INNER JOIN ticker_time_interval ON ticker.id=ticker_time_interval.ticker_id WHERE chatroom_id = $1 ORDER BY date_time DESC;';
const getTickersByTimeInterval = '';
const getTickersByTickerID = '';

//Insert
const insertTimeIntervalToTicker = 'INSERT INTO ticker_time_interval (chatroom_id, name, symbol, ticker_id, current_price, high_price, low_price, recommendation, volume, date_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now());';

module.exports = {
  getAllTickers,
  getTickersByChatroomID,
  insertTimeIntervalToTicker
};