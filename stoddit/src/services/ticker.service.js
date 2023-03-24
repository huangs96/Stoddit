const getTickers = () => {
  return fetch('http://localhost:5000/tickers', {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  });
};

const getTickersByChatroomID = async (chatroomID) => {
  return fetch(`http://localhost:5000/tickers/${chatroomID}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    };
    throw response;
  });
};

module.exports = {
  getTickers,
  getTickersByChatroomID
}