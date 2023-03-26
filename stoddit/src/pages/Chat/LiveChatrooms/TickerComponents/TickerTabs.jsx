import React, {useState} from 'react';
import './TickerTabs.css';
import chevronDown from '../../../../images/chevron-down.svg'
import chevronUp from '../../../../images/chevron-up.svg';

function TickerTabs({ticker}) {
  const [tickerChange, setTickerChange] = useState('positive');
  // if (ticker[0].changePercentage < 0) {
  //   console.log('negative', ticker[0].changePercentage)
  // } else {
  //   console.log('positive', ticker[0].changePercentage)
  // };
  const arrowDisplay = (

    <img
      src={tickerChange === 'positive' ?
      chevronUp
      :
      chevronDown
    }
      alt={tickerChange === 'negative' ?
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
          <div className="tickerSymbol">{ticker[0].symbol}</div>
          <div className="tickerName">{ticker[0].name}</div>
        </div>
        <div className="priceContainer">
          <div className="changePercentage">{ticker[0].changePercentage}%
          <img
            src={tickerChange === 'positive' ?
            chevronUp
            :
            chevronDown
          }
            alt={tickerChange === 'negative' ?
            chevronUp
            :
            chevronDown
          }
          >
          </img>
          </div>
          <div className="tickerCPrice">{ticker[0].current_price}</div>
          <div className="tickerVolume">{ticker[0].volume}</div>
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