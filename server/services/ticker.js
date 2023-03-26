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
  // console.log('mostRecentTickers11111', mostRecentTickers);
  let mostRecentTickerData = Object.values(mostRecentTickers);
  for (let recentTicker = 0; recentTicker<mostRecentTickerData.length; recentTicker++) {
    let firstRecentTicker = mostRecentTickerData[recentTicker][0];
    let secondRecentTicker = mostRecentTickerData[recentTicker][1];
    const currentPriceChange = firstRecentTicker.current_price - secondRecentTicker.current_price;
    const currentPriceChangePercentage = Math.round(((firstRecentTicker.current_price - secondRecentTicker.current_price) / secondRecentTicker.current_price) * 100).toFixed(0);
    if (mostRecentTickers.hasOwnProperty(firstRecentTicker.name)) {
      mostRecentTickers[firstRecentTicker.name].push(currentPriceChange);
      mostRecentTickers[firstRecentTicker.name].push(currentPriceChangePercentage);
    };
  };
  // console.log('ticker222222', mostRecentTickers);
};

module.exports = {
  tickerChange
}