import React from 'react';
import TickerCharts from './TickerCharts';
import TickerTabs from './TickerTabs';

function TickerDisplay({chatroomTickers}) {
  console.log('console', chatroomTickers);
  const displayTickersChart = chatroomTickers.map(ticker => {
    return (
      <TickerCharts ticker={ticker} />
    )
  });

  const displayTickersTab = chatroomTickers.map(ticker => {
    return (
      <TickerTabs ticker={ticker}/>
    )
  })
  return (
    <div>
      {displayTickersChart}

    </div>
  )
}

export default TickerDisplay