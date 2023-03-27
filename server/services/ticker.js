const client = require('../classes/pgPoolClass');
const queries = require('../queries/ticker.queries');

const tickerAdd = (tickerData) => {
  
};

const tickerChange = (tickerData) => {
  const mostRecentTickers = {};
  for (let ticker = 0; ticker<tickerData.length; ticker++) {
    let eachTickerInfo = tickerData[ticker];
    if (!mostRecentTickers[eachTickerInfo.name]) {
      mostRecentTickers[eachTickerInfo.name] = [eachTickerInfo];
    } else if (mostRecentTickers[eachTickerInfo.name] && mostRecentTickers[eachTickerInfo.name].length < 2) {
      mostRecentTickers[eachTickerInfo.name].push(eachTickerInfo);
    };
  };
  let mostRecentTickerData = Object.values(mostRecentTickers);
  for (let recentTicker = 0; recentTicker<mostRecentTickerData.length; recentTicker++) {
    let firstRecentTicker = mostRecentTickerData[recentTicker][0];
    let secondRecentTicker = mostRecentTickerData[recentTicker][1];
    const currentPriceChange = firstRecentTicker.current_price - secondRecentTicker.current_price;
    const currentPriceChangePercentage = Math.round(((firstRecentTicker.current_price - secondRecentTicker.current_price) / secondRecentTicker.current_price) * 100).toFixed(0);
    if (mostRecentTickers.hasOwnProperty(firstRecentTicker.name)) {
      const openTickerObj = mostRecentTickers[firstRecentTicker.name][0];
      openTickerObj['changeInt'] = currentPriceChange;
      openTickerObj['changePercentage'] = parseInt(currentPriceChangePercentage);
    };
  };
  return mostRecentTickers;
};

module.exports = {
  tickerChange
}