require('dotenv').config();
const client = require('../config/db.config');
const queries = require('../queries/auth.queries')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginPage = (req, res) => {
  console.log('hi');
  res.json('login page working');
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
      const accessToken = jwt.sign({
        id: id,
        username: username
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s"});

      const refreshToken = jwt.sign({
        id: id,
        username: username
      }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
    
      console.log('cookieworks');

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ accessToken })
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

const refreshUserCookie = async (req, res) => {
  try {
    const refreshToken = req.cookies.jwt;
    console.log('refreshToken----', refreshToken === process.env.REFRESH_TOKEN_SECRET);
    console.log('process.env-----', process.env.REFRESH_TOKEN_SECRET);
    if (refreshToken === null) return res.status(401).json({error:'No refresh token'});
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({err:err.message});
      let tokens = jwtTokens(user);
      console.log('user----', user);
      res.cookie('jwt', tokens.refreshToken, { httpOnly: true });
      console.log('refreshtoken created');
      return res.json(tokens);
    })
  } catch (err) {
    res.status(401).json({error: err});
  }
}

const deleteUserCookie = (req, res) => {
  try {
    res.clearCookie('jwt');
    return res.status(200).json({message:'refresh token deleted.'})
  } catch (err) {
    res.status(401).json({error:err});
  }
}

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
  userAuthed,
  refreshUserCookie,
  deleteUserCookie
}