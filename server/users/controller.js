const client = require('../db');
const queries = require('./queries')

const getUsers = ((req, res) => {
  client.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    console.log(results);
    res.status(200).json(results.rows);
  })
});

module.exports = {
  getUsers,
}