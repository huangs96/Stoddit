import React, {useState} from 'react';
import './TickerTabs.css';
import TickerModal from './TickerModal';
import chevronDown from '../../../../images/chevron-down.svg'
import chevronUp from '../../../../images/chevron-up.svg';

function TickerTabs({ticker}) {
  const [tickerChange, setTickerChange] = useState('positive');
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log('ticker tickerTabs', ticker);
  
  const arrowDisplay = (
    <img
      src={ticker.changePercentage < 0 ?
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
      <div 
        className="tickerContainer"
        onClick={handleOpen}
      >
        <div className="tickerList">
          <div className="tickerNameSymbolContainer">
          <div className="tickerSymbol">{ticker.symbol}</div>
          <div className="tickerName">{ticker.name}</div>
        </div>
        <div className="priceContainer">
          <div className={ticker.changePercentage < 0 && ticker.changePercentage != 0 ? "changePercentageN" : "changePercentageP"}>{ticker.changePercentage}%
          {ticker.changePercentage != 0 && arrowDisplay}
          </div>
          <div className={ticker.changePercentage < 0 ? "currentCPriceN" : "currentCPriceP"}>{ticker.current_price}</div>
          <div className="tickerVolume">{ticker.volume}</div>
        </div>
        </div>
      </div>
      <TickerModal 
        onClose={handleClose}
        open={open}
        ticker={ticker}
      />
    </>
  )

  return (
    <>
    {displayTickerTab}
    </>
  )
}

export default TickerTabs