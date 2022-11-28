const client = require('../config/db.config');
const queries = require('../queries/auth.queries')


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require('express');
const res = require('express/lib/response');

const loginPage = (req, res) => {
  console.log('hi');
  res.send('login page working');
}

const authUser = (req, res) => {
  const {username, password} = req.body;
  console.log('req===,', username, password);

  if (username && password) {
    client.query(queries.getUsernameAndPassword, [username, password], (err, results) => {
      console.log(results);
      if (err) throw err;
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;

        response.redirect('/user/:id');
      } else {
        res.send('Incorrect Username and/or Password, please try again.')
      }
    });
  } else {
    res.send('Please enter Username and Password');
    res.end();
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