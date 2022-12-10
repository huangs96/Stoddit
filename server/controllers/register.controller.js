const client = require('../config/db.config');
const queries = require('../queries/register.queries');
const bcrypt = require('bcryptjs');

const registerPage = (req, res) => {
  res.send('register page working');
}

const registerUser = async (req, res) => {
  const {username, password, bio, phone} = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    //check if phone exists
    const userPhoneExists = await client.query(queries.userPhoneExists, [phone]);
    if (userPhoneExists.rows.length) {
      return res.send('Phone number is in use.');
    };

    //check if username exists
    const usernameExists = await client.query(queries.usernameExists, [username]);
    if (usernameExists.rows.length) {
      return res.send('Username has already been taken.')
    };

    //register user if phone & username are not taken
    const registerUser = await client.query(queries.addUser, [username, encryptedPassword, bio, phone]);
    if (registerUser) {
      res.status(201).json('Your Account has been Created!');
    };
  } catch (err) {
    return res.status(400).send(err)
  }
};

module.exports = {
  registerPage,
  registerUser,
} 