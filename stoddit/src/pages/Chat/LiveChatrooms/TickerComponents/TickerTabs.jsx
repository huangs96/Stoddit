import React from 'react';
import TickerTabs from './TickerTabs.css';

function TickerTabs({ticker}) {
  console.log('tickertab', ticker);
  return (
  //   <div className="stockContainer">
  //   <div className="stockList">
  //     <span className="stockName">{ticker.name}</span>
  //     <span className="stockSymbol">{ticker.symbol}</span>
  //     <span className="stockCPrice">{ticker.current_price}</span>
  //     <span className="stockHPrice">{ticker.high_price}</span>
  //     <span className="stockLPrice">{ticker.low_price}</span>
  //     <span className="stockRecommendation">{ticker.recommendation}</span>
  //     <span className="stockVolume">{ticker.volume}</span>
  //   </div>
  // </div>
  <div data-id={props.id} className={[stylesGeneric.tickerItem, stylesFinancial.tickerItemFinancial].join(' ')}>
    <div className={stylesFinancial.tickerTopLevel}>
    {ticker.name}
      <div className={stylesFinancial.tickerSymbol}>{props.symbol}</div>
      <div className={stylesFinancial.lastPrice}>{props.lastPrice}</div>
    </div>
    <div className={stylesFinancial.tickerStats}>
      <img  className={stylesFinancial.tickerMovement} src={props.change ? chevronUp : chevronDown} alt={props.change ? 'up' : 'down'} />
      <div className={[statusClassName, stylesFinancial.tickerInfo].join(' ')}>
        <div className={stylesFinancial.tickerChangePercentage}>{props.percentage}</div>
        <div className={stylesFinancial.tickerCurrentPrice}>{props.currentPrice}</div>
      </div>
    </div>
  </div>
  )
}

export default TickerTabs