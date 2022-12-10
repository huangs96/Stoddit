require('dotenv').config();
const jwt = require('jsonwebtoken');

//authorize JWT token for user
const authToken = (req, res, next) => {
  //taking token from req.header, which we sent when login is sucessful
  const token = req.cookies.jwt;
  console.log('token----', req.cookies);

  if(!token) {
    console.log('no token');
    return res.status(401).send('Access Denied');
  }

  try {
    //matching token with secret token in .env
    const authed = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = authed;
    console.log('authed----', req.user);
    next();
  } catch (err) {
    console.log('error');
    res.clearCookie('token');
    return res.status(403).json({error: 'error'})
  }
}

module.exports = {
  authToken,
};