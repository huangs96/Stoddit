const client = require('../classes/pgPoolClass');
const queries = require('../queries/ticker.queries');

const tickerDataRandomizer = (tickerData) => {
  const randomNumber = Math.random().toFixed(2);
  const randomNumber10th = Math.floor(Math.random() * 10);
  const randomNumber100th = Math.floor(Math.random() * 100);
  const priceChangeRandomizer = Math.random() < 0.5;
  tickerData = {
    "tickerName": "Picrosoft",
    "tickerSymbol": "$psft",
    "ticker_id": 4,
    "current_price": 680,
    "high_price": 990,
    "low_price": 607,
    "recommendation": "SELL",
    "volume": 1000000
  };
  const newTickerIntervalData = {
    "tickerName": tickerData.tickerName,
    "tickerSymbol": tickerData.tickerSymbol,
    "ticker_id": tickerData.ticker_id,
    "current_price": tickerData.current_price,
    "high_price": tickerData.high_price,
    "low_price": tickerData.low_price,
    "recommendation": tickerData.recommendation,
    "volume": tickerData.volume,
  };

  if (tickerData) {

    switch (priceChangeRandomizer) {
      case true:
      case tickerData.current_price > 1000:
        if (tickerData.current_price > 1000) {
          const newCurrentPrice = tickerData.current_price + randomNumber100th;
          const newVolume = tickerData.volume + randomNumber100th;
          if (newCurrentPrice > tickerData.high_price) {
            const newHighPrice = newCurrentPrice;
            newTickerIntervalData['high_price'] = newHighPrice;
          };
          newTickerIntervalData["current_price"] = newCurrentPrice;
          newTickerIntervalData["volume"] = newVolume;
          console.log('100th true', newCurrentPrice);
          console.log('100th true', newVolume);
        } else if (tickerData.current_price > 100) {
          const newCurrentPrice = tickerData.current_price + randomNumber10th;
          const newVolume = tickerData.volume + randomNumber100th;
          if (newCurrentPrice > tickerData.high_price) {
            const newHighPrice = newCurrentPrice;
            newTickerIntervalData['high_price'] = newHighPrice;
          };
          newTickerIntervalData["current_price"] = newCurrentPrice;
          newTickerIntervalData["volume"] = newVolume;
          console.log('10th true', newCurrentPrice);
          console.log('10th true', newVolume);
        } else {
          const newCurrentPrice = tickerData.current_price + randomNumber;
          if (newCurrentPrice > tickerData.high_price) {
            const newHighPrice = newCurrentPrice;
            newTickerIntervalData['high_price'] = newHighPrice;
          };
          newTickerIntervalData["current_price"] = newCurrentPrice;
          newTickerIntervalData["volume"] = newVolume;
          console.log('1th true', newCurrentPrice);
          console.log('1th true', newVolume);
        }
        break;
      case false:
        if (tickerData.current_price > 1000) {
          const newCurrentPrice = tickerData.current_price - randomNumber100th;
          const newVolume = tickerData.volume - randomNumber100th;
          if (newCurrentPrice < tickerData.low_price) {
            const newLowPrice = newCurrentPrice;
            newTickerIntervalData['low_price'] = newLowPrice;
          };
          newTickerIntervalData["current_price"] = newCurrentPrice;
          newTickerIntervalData["volume"] = newVolume;
          console.log('100th false', newCurrentPrice);
          console.log('100th false', newVolume);
        } else if (tickerData.current_price > 100) {
          const newCurrentPrice = tickerData.current_price - randomNumber10th;
          const newVolume = tickerData.volume - randomNumber10th;
          if (newCurrentPrice < tickerData.low_price) {
            const newLowPrice = newCurrentPrice;
            newTickerIntervalData['low_price'] = newLowPrice;
          };
          newTickerIntervalData["current_price"] = newCurrentPrice;
          newTickerIntervalData["volume"] = newVolume;
          console.log('10th false', newCurrentPrice);
          console.log('10th false', newVolume);
        } else {
          const newCurrentPrice = tickerData.current_price - randomNumber;
          const newVolume = tickerData.volume + randomNumber;
          if (newCurrentPrice < tickerData.low_price) {
            const newLowPrice = newCurrentPrice;
            newTickerIntervalData['low_price'] = newLowPrice;
          };
          newTickerIntervalData["current_price"] = newCurrentPrice;
          newTickerIntervalData["volume"] = newVolume;
          console.log('1th false', newCurrentPrice);
          console.log('1th false', newVolume);
        }
        break;
    };
    // console.log('newCurrentPrice', randomNumber);
    // console.log('newCurrentPrice', randomNumber10th);
    // console.log('newCurrentPrice', randomNumber100th);
    // console.log('newCurrentPrice', priceChangeRandomizer);
  };

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
  tickerDataRandomizer,
  tickerChange
}