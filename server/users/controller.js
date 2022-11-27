const client = require('../db');
const queries = require('./queries')

const getUsers = ((req, res) => {
  client.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    console.log(results);
    res.status(200).json(results.rows);
  })
});

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  client.query(queries.getUsersById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const registerUser = (req, res) => {
  const {username, password, bio, phone} = req.body;
  //check if username exists
  client.query(queries.userExists, [phone], (error, results) => {
    if (results.rows.length) {
      res.send('Phone number has already been registered');
    }
  })
};

module.exports = {
  getUsers,
  getUsersById,
  registerUser
}