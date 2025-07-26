const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const dynamo = new AWS.DynamoDB.DocumentClient();

const BUCKET_NAME = 'nebulabox-user-files';
const TABLE_NAME = 'NebulaFiles';

exports.handler = async (event) => {
  const { userId, fileId, filename } = JSON.parse(event.body);

  if (!userId || !fileId || !filename) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing userId, fileId or filename" }),
    };
  }

  try {
    // 1. Deletar o arquivo no S3
    await s3.deleteObject({
      Bucket: BUCKET_NAME,
      Key: `${userId}/${fileId}-${filename}`,
    }).promise();
    

    // 2. Deletar o metadado na DynamoDB
    await dynamo.delete({
      TableName: TABLE_NAME,
      Key: {
        userId: userId,
        fileId: fileId
      },
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "File deleted successfully" }),
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error deleting file", error: err.message }),
    };
  }
};
