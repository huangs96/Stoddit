const client = require('../db');
const queries = require('./queries')

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

const registerUser = (req, res) => {
  const {username, password, bio, phone} = req.body;
  //check if username exists
  client.query(queries.userExists, [phone], (err, results) => {
    if (results.rows.length) {
      res.send('Phone number has already been registered.');
    }

    //register user
    client.query(queries.addUser, [username, password, bio,phone], (err, results) => {
      if (err) throw err;
      res.status(201).send('Your account has been created!');
    })
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  //check if account exists
  client.query(queries.getUsersById, [id], (err, results) => {
    if (!results.rows.length) {
      res.send('Account does not exist');
    }
  });

  //delete if account exists
  client.query(queries.deleteUser, [id], (err, results) => {
    if (err) throw err;
    res.status(200).send('Account has been deleted');
  })
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const {username, password, bio, phone} = req.body;

  //check if account exists
  client.query(queries.getUsersById, [id], (err, results) => {
    if (!results.rows.length) {
      res.send('Account does not exist');
    }
  });

  //update user info
  client.query(queries.updateUser, [username, password, bio, phone, id], (err, result) => {
    if (err) throw err;
    res.status(200).send('Account has been updated')
  })

  
}

module.exports = {
  getUsers,
  getUsersById,
  registerUser,
  deleteUser,
  updateUser
} 