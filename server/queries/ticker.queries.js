const getAllTickers = 'SELECT * FROM ticker;';
const getTickersByChatroomID = 'SELECT * FROM ticker WHERE chatroom_id = $1;';

module.exports = {
  getAllTickers,
  getTickersByChatroomID
};