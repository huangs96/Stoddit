import React from 'react'

function TickerTabs({ticker}) {
  console.log('tickertab', ticker);
  return (
    <div className="stockContainer">
    <div className="stockList">
      <span className="stockName">{ticker.name}</span>
      <span className="stockSymbol">{ticker.symbol}</span>
      {/* <span className="stockSymbol">{ticker.symbol}</span> */}
    </div>
  </div>
  )
}

export default TickerTabs