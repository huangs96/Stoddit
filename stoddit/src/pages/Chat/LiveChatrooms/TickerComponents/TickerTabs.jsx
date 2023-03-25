import React from 'react';
import './TickerTabs.css';
import chevronDown from '../../../../images/chevron-down.svg'
import chevronUp from '../../../../images/chevron-up.svg';

function TickerTabs({ticker}) {
  console.log('tickertab', ticker);
  return (
    <div className="tickerContainer">
      <div className="tickerList">
        <div className="tickerName">{ticker.name}</div>
        <div className="tickerSymbol">{ticker.symbol}</div>
        <div className="tickerCPrice">{ticker.current_price}</div>
        <div className="tickerHPrice">{ticker.high_price}</div>
        <div className="tickerLPrice">{ticker.low_price}</div>
        <div className="tickerRecommendation">{ticker.recommendation}</div>
        <div className="tickerVolume">{ticker.volume}</div>
      </div>
    </div>
  )
}

export default TickerTabs