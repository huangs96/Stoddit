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

  if (username && password) {
    client.query(queries.getUsernameAndPassword, [username, password], (err, results) => {
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

module.exports = {
  authUser,
  loginPage
}