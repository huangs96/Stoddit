import React from 'react';
import { LineController, LineElement, PointElement} from 'chart.js';

function TickerCharts({ticker}) {
  console.log('chart', LineController, LineElement, PointElement);
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
}

export default TickerCharts