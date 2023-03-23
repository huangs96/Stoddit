require('dotenv').config();
const client = require('../classes/pgPoolClass');
const queries = require('../queries/ticker.queries');

const getTickers = (async (req, res) => {
  try {
    const allTickers = await client.query(queries.getAllTickers);
    if (allTickers.rows.length) {
      res.status(200).json(allTickers.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

module.exports = {
  getTickers
}