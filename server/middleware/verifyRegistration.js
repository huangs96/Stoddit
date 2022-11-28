const client = require('../config/db.config');
const queries = require('../queries/user.queries')


const checkSignUpInfoExists = (req, res) => {
  const {username, phone} = req.body;
  //check if username exists
  client.query(queries.userExists, [username, phone], (err, results) => {
    if (results.rows.length) {
      return res.send('Phone number has already been registered.');
    }
  });
};

checkSignUpInfoExists();

module.exports = {
  checkSignUpInfoExists
};