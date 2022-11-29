require('dotenv').config();
const client = require('../config/db.config');
const queries = require('../queries/auth.queries')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const loginPage = (req, res) => {
  console.log('hi');
  res.send('login page working');
}

const authUser = async (req, res) => {
  const {username, password} = req.body;
  console.log('req===,', username, password);
  try {
    const results = await client.query(queries.getUsernameAndPassword, [username]);
    for (let i of results.rows) {
      id = i.id;
      encryptedPassword = i.password;
    }
    const passwordMatch = await bcrypt.compare(password, encryptedPassword);

    if (passwordMatch) {
      const token = jwt.sign({
        id: id,
        username: username
      }, process.env.ACCESS_TOKEN_SECRET);
      res.header('auth-token', token).send(token);
    } else {
      res.send('Incorreect Username or Password');
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

const userAuthed = (req, res) => {
  if (req.session.loggedin) {
    res.send('Hello, ' + req.session.username + '!');
  } else {
    res.send('Please login!');
  }
};

module.exports = {
  authUser,
  loginPage,
  userAuthed
}