import React from 'react';
import TickerCharts from './TickerCharts';
import TickerTabs from './TickerTabs';

function TickerDisplay({chatroomTickers}) {
  console.log('console', chatroomTickers);

  const tickerNames = Object.keys(chatroomTickers);
  const displayTickersTab = tickerNames.map(names => {
    const tickerData = chatroomTickers[names];
    return (
      <TickerTabs ticker={tickerData}/>
    )
  })
  return (
    <div>
      {/* {displayTickersChart} */}
      {displayTickersTab}
    </div>
  )
}

export default TickerDisplay