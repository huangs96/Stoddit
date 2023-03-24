import React from 'react';

function TickerDisplay({chatroomTickers}) {
  console.log('console', chatroomTickers);
  const displayTickers = chatroomTickers.map(ticker => {
    return (
      <div className="chatroomTickerContainer">
        {ticker.name}
      </div>
    )
  })
  return (
    <div>
      {displayTickers}
    </div>
  )
}

export default TickerDisplay