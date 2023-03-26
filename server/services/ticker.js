const client = require('../classes/pgPoolClass');
const queries = require('../queries/ticker.queries');

const tickerAdd = () => {

};

const tickerChange = (tickerData) => {
  console.log('tickerData in bizz logic', tickerData);
  const recentTickerData = [tickerData[0], tickerData[1]];
  console.log('recentTickerData', recentTickerData);
};

module.exports = {
  tickerChange
}