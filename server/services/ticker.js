const client = require('../classes/pgPoolClass');
const queries = require('../queries/ticker.queries');

const tickerDataRandomizer = (tickerData) => {
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
  };

  if (tickerData) {
    const randomNumber = Math.random().toFixed(2);
    const randomNumber10th = Math.floor(Math.random() * 10);
    const randomNumber100th = Math.floor(Math.random() * 100);
    const priceChangeRandomizer = Math.random() < 0.5;

    switch (priceChangeRandomizer) {
      case true:
      case tickerData.current_price > 1000:
      case tickerData.volume > 99999:
        const newCurrentPrice = tickerData.current_price + randomNumber100th;
        const newVolume = tickerData.volume + randomNumber100th;
        if (newCurrentPrice > tickerData.high_price) {
          const newHighPrice = newCurrentPrice;
        };
        console.log('100th true', newCurrentPrice);
        break;
      case true:
      case tickerData.current_price > 100:
      case tickerData.volume > 99999:
        const newCurrentPrice = tickerData.current_price + randomNumber10th;
        const newVolume = tickerData.volume + randomNumber10th;
        if (newCurrentPrice > tickerData.high_price) {
          const newHighPrice = newCurrentPrice;
        };
        console.log('10th true', newCurrentPrice);
        break;
      case true:
      case tickerData.current_price > 10:
      case tickerData.volume > 99999:
        const newCurrentPrice = tickerData.current_price + randomNumber;
        const newVolume = tickerData.volume + randomNumber;
        if (newCurrentPrice > tickerData.high_price) {
          const newHighPrice = newCurrentPrice;
        };
        console.log('1th true', newCurrentPrice);
        break;
      case false:
      case tickerData.current_price < 1000:
      case tickerData.volume > 99999:
        const newCurrentPrice = tickerData.current_price - randomNumber100th;
        const newVolume = tickerData.volume - randomNumber100th;
        if (newCurrentPrice < tickerData.low_price) {
          const newLowPrice = newCurrentPrice;
        };
        console.log('100th false', newCurrentPrice)
        } else if (tickerData.current_price > 100) {
          const newCurrentPrice = tickerData.current_price - randomNumber10th;
          if (newCurrentPrice < tickerData.low_price) {
            const newLowPrice = newCurrentPrice;
          };
          console.log('10th false', newCurrentPrice)
        } else {
          const newCurrentPrice = tickerData.current_price - randomNumber;
          if (newCurrentPrice < tickerData.low_price) {
            const newLowPrice = newCurrentPrice;
          };
          console.log('1th false', newCurrentPrice)
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