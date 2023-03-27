//Get
const getAllTickers = 'SELECT * FROM ticker;';
const getTickersByChatroomID = 'SELECT * FROM ticker INNER JOIN ticker_time_interval ON ticker.id=ticker_time_interval.ticker_id WHERE chatroom_id = $1 ORDER BY date_time DESC;';
const getTickersByTickerID = 'SELECT * FROM ticker_time_interval WHERE ticker_id = $1 order by id desc;'
const getTickersByTimeInterval = '';

//Insert
const insertTimeIntervalToTicker = 'INSERT INTO ticker_time_interval (ticker_id, current_price, high_price, low_price, recommendation, volume, date_time) VALUES ($1, $2, $3, $4, $5, $6, now());';

module.exports = {
  getAllTickers,
  getTickersByChatroomID,
  getTickersByTickerID,
  insertTimeIntervalToTicker
};