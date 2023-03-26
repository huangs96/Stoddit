const getAllTickers = 'SELECT * FROM ticker;';
const getTickersByChatroomID = 'SELECT * FROM ticker INNER JOIN ticker_time_interval ON ticker.id=ticker_time_interval.ticker_id WHERE chatroom_id = $1;';
const getTickersByTimeInterval = '';

module.exports = {
  getAllTickers,
  getTickersByChatroomID
};