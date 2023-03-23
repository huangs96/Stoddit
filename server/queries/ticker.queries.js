const getAllTickers = 'SELECT * FROM tickers;';
const getTickersByChatroomID = 'SELECT * FROM tickers WHERE id = $1;';

module.exports = {
  getAllTickers,
  getTickersByChatroomByID
};