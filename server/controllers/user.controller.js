require('dotenv').config();
const client = require('../classes/pgPoolClass');
const queries = require('../queries/user.queries');
const existQueries = require('../queries/register.queries');
const awsS3 = require('../classes/awsClass');


const getUsers = (async (req, res) => {
  try {
    const allUsers = await client.query(queries.getUsers);
    console.log(allUsers.rows);
    if (allUsers.rows.length) {
      for (let x=0; x<allUsers.rows.length; x++) {
        const userDetails = allUsers.rows[x];
        if (userDetails.contact_img !== null) {
          const url = await awsS3.getImgUrl(userDetails.contact_img);
          userDetails.imgUrl = url;
        };
      };
      res.status(200).json(allUsers.rows);
    };
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getUsersById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const userWithId = await client.query(queries.getUsersById, [id]);
    if (userWithId.rows.length) {
      const userDetails = userWithId.rows;
      if (userDetails.contact_img !== null) {
        const url = await awsS3.getImgUrl(userDetails.contact_img);
        userDetails[0].imgUrl = url;
      };
      console.log('userDetails', userDetails);
      return res.status(200).json(userDetails);
    } else {
      return res.send('Unable to find user with given ID.');
    }
  } catch (err) {
    return res.status(400).send(err);
  };
};

const getUserHomePage = async (req, res) => {
  return res.json({'user': req.user});
}

const deleteUser = async (req, res) => { 
  const id = parseInt(req.params.id);

  try {
    const userWithId = await client.query(queries.getUsersById, [id]);
    if (userWithId.rows.length) {
      await client.query(queries.deleteUser, [id]);
      res.status(200).send('Account has been deleted.');
    } else {
      return res.send('Unable to delete user with given ID.')
    };
  } catch (err) {
    return res.status(400).send(err);
  };
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const {username, password, bio, phone} = req.body;

  //check if account exists
  try {
    const userWithId = await client.query(queries.getUsersById, [id]);
    if (userWithId.rows.length) {
      const usernameExists = await client.query(existQueries.usernameExists, [username]);
      const userPhoneExists = await client.query(existQueries.userPhoneExists, [phone]);
      if (usernameExists.rows.length && !userPhoneExists.rows.length) {
        return res.send('Unable to update user as username is taken.');
      } else if (!usernameExists.rows.length && userPhoneExists.rows.length) {
        return res.send('Unable to update phone number as it is in use.')
      } else if (!usernameExists.rows.length && !userPhoneExists.rows.length) {
        await client.query(queries.updateUser, [username, password, bio, phone, id]);
        res.status(200).send('Account details have been updated');
      };
    };
  } catch (err) {
    return res.status(400).send(err);
  };
};

const uploadImage = async (req, res) => {
  try {
    awsS3.uploadImage(req);
    res.send({});
  } catch (err) {
    return res.status(400).send(err);
  };
};

module.exports = {
  getUsers,
  getUsersById,
  getUserHomePage,
  deleteUser,
  updateUser,
  uploadImage
};