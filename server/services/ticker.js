const client = require('../classes/pgPoolClass');
const queries = require('../queries/ticker.queries');

const tickerDataRandomizer = (tickerData) => {
  // console.log('ticker data in randomizer', tickerData);
  const randomNumber = Math.random().toFixed(2);
  const randomNumber10th = Math.floor(Math.random() * 10);
  const randomNumber100th = Math.floor(Math.random() * 100);
  const priceChangeRandomizer = Math.random() < 0.5;
  const newTickerIntervalData = Object.create(Object.getPrototypeOf(tickerData), Object.getOwnPropertyDescriptors(tickerData));
  // console.log('new Interval copy', newTickerIntervalData);
    if (priceChangeRandomizer) {
      const newCurrentPrice = tickerData.current_price + randomNumber100th;
      const newVolume = tickerData.volume + randomNumber100th;
      newTickerIntervalData.current_price = newCurrentPrice;
      newTickerIntervalData.volume = newVolume;
    } else {
      const newCurrentPrice = tickerData.current_price - randomNumber10th;
      const newVolume = tickerData.volume - randomNumber100th;
      newTickerIntervalData.current_price = newCurrentPrice;
      newTickerIntervalData.volume = newVolume;
    };
    return newTickerIntervalData;
};

const tickerChange = (tickerData) => {
  const mostRecentTickers = {};
  // console.log('tickerData11111', tickerData.length);
  if (tickerData.length > 1) {
    for (let ticker = 0; ticker<tickerData.length; ticker++) {
      let eachTickerInfo = tickerData[ticker];
      if (!mostRecentTickers[eachTickerInfo.name]) {
        mostRecentTickers[eachTickerInfo.name] = [eachTickerInfo];
      } else if (mostRecentTickers[eachTickerInfo.name] && mostRecentTickers[eachTickerInfo.name].length < 2) {
        mostRecentTickers[eachTickerInfo.name].push(eachTickerInfo);
      };
    };
  } else {
    mostRecentTickers[tickerData.name] = tickerData;
  };

  // console.log('mostRecentTickers111111', mostRecentTickers);
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

const tickerDataGenerator = (tickerData) => {
  console.log('ticker', tickerData);
};

module.exports = {
  tickerDataRandomizer,
  tickerChange,
  tickerDataGenerator
}