require('dotenv').config();
const { S3Client, PutObjectCommand }= require("@aws-sdk/client-s3");
const crypto = require('crypto');
const client = require('../classes/pgPoolClass');
const queries = require('../queries/user.queries');
const existQueries = require('../queries/register.queries');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKey: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
});


const getUsers = (async (req, res) => {
  try {
    const allUsers = await client.query(queries.getUsers);
    if (allUsers.rows.length) {
      res.status(200).json(allUsers.rows);
    }
  } catch (err) {
    return res.status(400).send(err);
  };
});

const getUsersById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const userWithId = await client.query(queries.getUsersById, [id]);
    if (userWithId.rows.length) {
      return res.status(200).json(userWithId.rows);
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
  console.log('res', req.files);
  const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
  const params = {
    Bucket: bucketName,
    Key: randomImageName(),
    Body: buffer,
    ContentType: req.files.mimetype
  };

  const command = new PutObjectCommand(params)
  await s3.send(command)

  res.send({});
};

module.exports = {
  getUsers,
  getUsersById,
  getUserHomePage,
  deleteUser,
  updateUser,
  uploadImage
};