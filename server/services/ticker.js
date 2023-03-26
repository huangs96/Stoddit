const client = require('../classes/pgPoolClass');
const queries = require('../queries/ticker.queries');

const tickerAdd = () => {

};

const tickerChange = (tickerData) => {
  console.log('tickerData in bizz logic', tickerData);
  for (let ticker = 0; ticker<tickerData.length; ticker++) {
    
  }
};

module.exports = {
  tickerChange
}