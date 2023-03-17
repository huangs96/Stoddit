require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const {
  getSignedUrl,
  S3RequestPresigner,
} = ("@aws-sdk/s3-request-presigner");
const crypto = require('crypto');
const client = require('../classes/pgPoolClass');
const queries = require('../queries/user.queries');
const existQueries = require('../queries/register.queries');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
});



const getUsers = (async (req, res) => {
  const allUsers = await client.query(queries.getUsers);
  console.log(allUsers.rows);
  if (allUsers.rows.length) {
    // console.log(allUsers.rows);
    for (let x=0; x<allUsers.rows.length; x++) {
      const userDetails = allUsers.rows[x];
      if (userDetails.contact_img !== null) {
        const getObjectParams = { 
          Bucket: bucketName,
          // Key: `Stoddit-Profile-Images/${userDetails.contact_img}`
          Key: '9AB82A4D-F355-4A28-9E59-97CF961B4C58.heic'
        };
        const command = new GetObjectCommand(getObjectParams);
        console.log('2', command);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        console.log('3', url);
      };
      // console.log(url);
      // res.status(200).json(userDetails);
    };
    // res.status(200).json(allUsers.rows);
  };
  // try {
  // } catch (err) {
  //   return res.status(400).send(err);
  // };
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
  console.log('res', req.file);
  const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
  const params = {
    Bucket: bucketName,
    Key: 'Stoddit-Profile-Images/' + randomImageName(),
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

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