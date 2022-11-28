const client = require('../config/db.config');
const queries = require('../queries/register.queries');

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

//user still gets added, fix tomorrow***
const registerUser = (req, res) => {
  const {username, password, bio, phone} = req.body;
  
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
      client.query(queries.addUser, [username, password, bio,phone], (err, results) => {
        if (err) throw err;
        res.status(201).send('Your account has been created!');
      });
    });
  });
};

module.exports = {
  registerPage,
  getUsers,
  getUsersById,
  registerUser,
} 