import React, {useState} from 'react';
import './TickerTabs.css';
import chevronDown from '../../../../images/chevron-down.svg'
import chevronUp from '../../../../images/chevron-up.svg';

function TickerTabs({ticker}) {
  const [tickerChange, setTickerChange] = useState('positive');
  
  const arrowDisplay = (
    <img
      src={ticker.changePercentage < 0 ?
      chevronDown
      :
      chevronUp
    }
      alt={ticker.changePercentage < 0 ?
      chevronDown
      :
      chevronUp
    }
    >
    </img>
  )

  const displayTickerTab = 
    (
      <>
      <div className="tickerContainer">
        <div className="tickerList">
          <div className="tickerNameSymbolContainer">
          <div className="tickerSymbol">{ticker.symbol}</div>
          <div className="tickerName">{ticker.name}</div>
        </div>
        <div className="priceContainer">
          <div className={ticker.changePercentage < 0 ?"changePercentageN" : "changePercentageP"}>{ticker.changePercentage}%
          {arrowDisplay}
          </div>
          <div className={ticker.changePercentage < 0 ?"currentCPriceN" : "currentCPriceP"}>{ticker.current_price}</div>
          <div className="tickerVolume">{ticker.volume}</div>
        </div>
        </div>
      </div>
    </>
  )

  return (
    <>
    {displayTickerTab}
    </>
  )
}

export default TickerTabs