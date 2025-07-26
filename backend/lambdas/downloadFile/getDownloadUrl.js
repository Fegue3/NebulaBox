const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const BUCKET_NAME = 'nebulabox-user-files';

exports.handler = async (event) => {
  const { userId, fileId, filename } = JSON.parse(event.body);

  if (!userId || !fileId || !filename) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing userId, fileId or filename" }),
    };
  }

  try {
    const s3Key = `${userId}/${fileId}-${filename}`;

    const url = s3.getSignedUrl('getObject', {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Expires: 60 * 5, // 5 minutos
      ResponseContentDisposition: 'attachment'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ downloadUrl: url }),
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error generating download URL", error: err.message }),
    };
  }
};
