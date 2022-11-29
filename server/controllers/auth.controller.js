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
      encryptedPassword = i.password;
    }
    const passwordMatch = await bcrypt.compare(password, encryptedPassword);
    if (passwordMatch) {
      res.send('Login Successful');
      // response.redirect('/user/:id');
    }
  } catch (err) {
    return res.json({status: 'error', error:'Incorrect Username or Password'})
  }

  // if (username && password) {
  //   client.query(queries.getUsernameAndPassword, [username, password], (err, results) => {
  //     console.log('results----', results);
  //     if (err) throw err;
  //     if (results.rows.length) {
  //       const cryptedPassword = results.rows.password;
  //       const comparePasswords = await bcrypt.compare(password, cryptedPassword)
  //       if (comparePasswords) {
  //         res.send('Login Successful');
  //         // response.redirect('/user/:id');
  //       } 
  //     } else {
  //       res.send('Incorrect Username and/or Password, please try again.')
  //     }
  //   });
  // } else {
  //   res.send('Please enter Username and Password');
  //   res.end();
  // }
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