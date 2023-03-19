require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require('crypto');

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

class AwsS3 {
  constructor() {
  };

  getImgUrl = (imgName) => {
    const getObjectParams = {
      Bucket: bucketName,
      Key: `Stoddit-Profile-Images/${imgName}`
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  };

  uploadImage = (req) => {
    const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
    const params = {
      Bucket: bucketName,
      Key: 'Stoddit-Profile-Images/' + randomImageName(),
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };
    const command = new PutObjectCommand(params);
    s3.send(command);
  };
};

module.exports = new AwsS3();