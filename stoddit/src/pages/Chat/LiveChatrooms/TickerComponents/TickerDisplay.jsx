import React from 'react';

function TickerDisplay({chatroomTickers}) {
  console.log('console', chatroomTickers);
  const displayTickers = chatroomTickers.map(ticker => {
    return (
      <div 
      className="friendsOffline"
      >
      <div className="chatOfflineFriend">
        <div className="friendOfflineImgContainer">
        </div>
        <span className="offlineFriendName">{ticker.name}</span>
      </div>
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