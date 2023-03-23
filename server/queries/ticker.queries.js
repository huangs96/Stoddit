const getAllTickers = 'SELECT * FROM ticker;';
const getTickersByChatroomID = 'SELECT * FROM tickers WHERE id = $1;';

module.exports = {
  getAllTickers,
  getTickersByChatroomID
};