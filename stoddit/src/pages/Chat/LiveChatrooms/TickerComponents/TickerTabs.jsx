import React from 'react';
import './TickerTabs.css';

// import chevronUp from '../../images/chevron-up.svg';
// import chevronDown from '../../images/chevron-down.svg';

function TickerTabs({ticker}) {
  console.log('tickertab', ticker);
  return (
    <div className="stockContainer">
    <div className="stockList">
      <div className="stockName">{ticker.name}</div>
      <div className="stockSymbol">{ticker.symbol}</div>
      <div className="stockCPrice">{ticker.current_price}</div>
      <div className="stockHPrice">{ticker.high_price}</div>
      <div className="stockLPrice">{ticker.low_price}</div>
      <div className="stockRecommendation">{ticker.recommendation}</div>
      <div className="stockVolume">{ticker.volume}</div>
    </div>
  </div>
  )
}

export default TickerTabs