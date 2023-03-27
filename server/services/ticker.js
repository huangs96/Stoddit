const client = require('../classes/pgPoolClass');
const queries = require('../queries/ticker.queries');

const tickerDataRandomizer = (arrTickerData) => {
  const randomNumber = Math.random().toFixed(2);
  const randomNumber10th = Math.floor(Math.random() * 10);
  const randomNumber100th = Math.floor(Math.random() * 100);
  const priceChangeRandomizer = Math.random() < 0.5;

  const newIntervalData = [];

  for (let tickerData of arrTickerData) {
    console.log('tickerData', tickerData);
    if (tickerData) {
      switch (priceChangeRandomizer) {
        case true:
          if (tickerData.current_price > 1000) {
            const newCurrentPrice = tickerData.current_price + randomNumber100th;
            const newVolume = tickerData.volume + randomNumber100th;
            if (newCurrentPrice > tickerData.high_price) {
              const newHighPrice = newCurrentPrice;
              tickerData['high_price'] = newHighPrice;
            };
            tickerData["current_price"] = newCurrentPrice;
            tickerData["volume"] = newVolume;
            console.log('100th true', newCurrentPrice);
            console.log('100th true', newVolume);
            newIntervalData.push(tickerData);
          } else if (tickerData.current_price > 100) {
            const newCurrentPrice = tickerData.current_price + randomNumber10th;
            const newVolume = tickerData.volume + randomNumber100th;
            if (newCurrentPrice > tickerData.high_price) {
              const newHighPrice = newCurrentPrice;
              tickerData['high_price'] = newHighPrice;
            };
            tickerData["current_price"] = newCurrentPrice;
            tickerData["volume"] = newVolume;
            console.log('10th true', newCurrentPrice);
            console.log('10th true', newVolume);
            newIntervalData.push(tickerData);
          } else {
            const newCurrentPrice = tickerData.current_price + randomNumber;
            if (newCurrentPrice > tickerData.high_price) {
              const newHighPrice = newCurrentPrice;
              tickerData['high_price'] = newHighPrice;
            };
            tickerData["current_price"] = newCurrentPrice;
            tickerData["volume"] = newVolume;
            console.log('1th true', newCurrentPrice);
            console.log('1th true', newVolume);
            newIntervalData.push(tickerData);
          }
          // break;
        case false:
          if (tickerData.current_price > 1000) {
            const newCurrentPrice = tickerData.current_price - randomNumber100th;
            const newVolume = tickerData.volume - randomNumber100th;
            if (newCurrentPrice < tickerData.low_price) {
              const newLowPrice = newCurrentPrice;
              tickerData['low_price'] = newLowPrice;
            };
            tickerData["current_price"] = newCurrentPrice;
            tickerData["volume"] = newVolume;
            console.log('100th false', newCurrentPrice);
            console.log('100th false', newVolume);
            newIntervalData.push(tickerData);
          } else if (tickerData.current_price > 100) {
            const newCurrentPrice = tickerData.current_price - randomNumber10th;
            const newVolume = tickerData.volume - randomNumber10th;
            if (newCurrentPrice < tickerData.low_price) {
              const newLowPrice = newCurrentPrice;
              tickerData['low_price'] = newLowPrice;
            };
            tickerData["current_price"] = newCurrentPrice;
            tickerData["volume"] = newVolume;
            console.log('10th false', newCurrentPrice);
            console.log('10th false', newVolume);
            newIntervalData.push(tickerData);
          } else {
            const newCurrentPrice = tickerData.current_price - randomNumber;
            const newVolume = tickerData.volume + randomNumber;
            if (newCurrentPrice < tickerData.low_price) {
              const newLowPrice = newCurrentPrice;
              tickerData['low_price'] = newLowPrice;
            };
            tickerData["current_price"] = newCurrentPrice;
            tickerData["volume"] = newVolume;
            newIntervalData.push(tickerData);
            console.log('1th false', newCurrentPrice);
            console.log('1th false', newVolume);
          }
          // break;
      };
    };
  }


  console.log('213123', newIntervalData);
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