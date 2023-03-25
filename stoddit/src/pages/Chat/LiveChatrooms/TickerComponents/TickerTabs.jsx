import React from 'react';
import '/TickerTabs.css';

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
  // <div data-id={props.id} className={[stylesGeneric.tickerItem, stylesFinancial.tickerItemFinancial].join(' ')}>
  //   <div className={stylesFinancial.tickerTopLevel}>
  //   {ticker.name}
  //     <div className={stylesFinancial.tickerSymbol}>{props.symbol}</div>
  //     <div className={stylesFinancial.lastPrice}>{props.lastPrice}</div>
  //   </div>
  //   <div className={stylesFinancial.tickerStats}>
  //     <img  className={stylesFinancial.tickerMovement} src={props.change ? chevronUp : chevronDown} alt={props.change ? 'up' : 'down'} />
  //     <div className={[statusClassName, stylesFinancial.tickerInfo].join(' ')}>
  //       <div className={stylesFinancial.tickerChangePercentage}>{props.percentage}</div>
  //       <div className={stylesFinancial.tickerCurrentPrice}>{props.currentPrice}</div>
  //     </div>
  //   </div>
  // </div>
  )
}

export default TickerTabs