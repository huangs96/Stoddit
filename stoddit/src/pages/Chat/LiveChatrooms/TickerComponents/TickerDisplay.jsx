import React from 'react';
import TickerCharts from './TickerCharts';

function TickerDisplay({chatroomTickers}) {
  console.log('console', chatroomTickers);
  const displayTickers = chatroomTickers.map(ticker => {
    return (
      <TickerCharts ticker={ticker} />
    )
  })
  return (
    <div>
      {displayTickers}
    </div>
  )
}

export default TickerDisplay