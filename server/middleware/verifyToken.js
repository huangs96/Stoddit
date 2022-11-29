require('dotenv').config();
const jwt = require('jsonwebtoken');

//authorize JWT token for user
const authToken = (req, res, next) => {
  //taking token from req.header called auth-token, which we sent when login is sucessful
  const token = req.header('auth-token');

  if(!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    //matching token with secret token in .env
    const authed = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = authed;
    next();
    console.log(req.user);
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

module.exports = {
  authToken,
};