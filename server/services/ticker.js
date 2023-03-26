const client = require('../classes/pgPoolClass');
const queries = require('../queries/ticker.queries');

const tickerAdd = () => {

};

const tickerChange = (tickerData) => {
  const mostRecentTickers = {};
  // console.log('tickerData in bizz logic', tickerData);
  for (let ticker = 0; ticker<tickerData.length; ticker++) {
    let eachTickerInfo = tickerData[ticker];
    if (!mostRecentTickers[eachTickerInfo.name]) {
      mostRecentTickers[eachTickerInfo.name] = [eachTickerInfo];
    } else if (mostRecentTickers[eachTickerInfo.name] && mostRecentTickers[eachTickerInfo.name].length < 2) {
      mostRecentTickers[eachTickerInfo.name].push(eachTickerInfo);
    };
  };
  // return mostRecentTickers;
  console.log('mostRecentTickers', mostRecentTickers);
  console.log('ticker values', Object.values(mostRecentTickers));
  let mostRecentTickerData = Object.values(mostRecentTickers);
};

module.exports = {
  tickerChange
}