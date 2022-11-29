const client = require('../config/db.config');
const queries = require('../queries/register.queries');
const bcrypt = require('bcryptjs');

const registerPage = (req, res) => {
  res.send('register page working');
}

const getUsers = ((req, res) => {
  client.query(queries.getUsers, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.status(200).json(results.rows);
  })
});

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  client.query(queries.getUsersById, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const registerUser = async (req, res) => {
  const {username, password, bio, phone} = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    //check if phone exists
  client.query(queries.userPhoneExists, [phone], (err, results) => {
    if (results.rows.length) {
      return res.send('Phone number has already been registered.');
    }
    
    //check if username exists
    client.query(queries.usernameExists, [username], (err, results) => {
      if (results.rows.length) {
        return res.send('Username has already been taken.');
      }

      //register user
      client.query(queries.addUser, [username, encryptedPassword, bio, phone], (err, results) => {
        if (err) throw err;
        res.status(201).send('Your account has been created!');
      });
    });
  });
  } catch (err) {
    console.log(err);
    return res.json({status:'error'});
  }
};

module.exports = {
  registerPage,
  getUsers,
  getUsersById,
  registerUser,
} 