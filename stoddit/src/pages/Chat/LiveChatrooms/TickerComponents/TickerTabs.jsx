import React, {useState} from 'react';
import './TickerTabs.css';
import chevronDown from '../../../../images/chevron-down.svg'
import chevronUp from '../../../../images/chevron-up.svg';

function TickerTabs({ticker}) {
  const [tickerChange, setTickerChange] = useState('positive');
  console.log('tickertab', ticker);
  const displayTickerTab = ticker.map(data => {
    console.log('data', data);
    return (
      <>
        <div className="tickerContainer">
          <div className="tickerList">
            <div className="tickerNameSymbolContainer">
            <div className="tickerSymbol">{data.symbol}</div>
            <div className="tickerName">{data.name}</div>
          </div>
          <div className="priceContainer">
            <div className="changePercentage">{data.percentage}%
            {/* <div className="tickerHPrice">{ticker.high_price}</div> */}
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
            {/* <div className="tickerCPrice">{ticker.current_price}</div> */}
            {/* <div className="tickerLPrice">{ticker.low_price}</div> */}
            {/* <div className="tickerRecommendation">{ticker.recommendation}</div> */}
            {/* <div className="tickerVolume">{ticker.volume}</div> */}
          </div>
          </div>
        </div>
      </>
    )
  })

  return (
    <>
    {displayTickerTab}
    </>
  )
}

export default TickerTabs