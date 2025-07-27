const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamo = new AWS.DynamoDB.DocumentClient();

const BUCKET_NAME = 'nebulabox-user-files';
const TABLE_NAME = 'NebulaFiles';

exports.handler = async (event) => {
  const { userId, fileId } = JSON.parse(event.body);

  if (!userId || !fileId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing userId or fileId" }),
    };
  }

  try {
    const result = await dynamo.get({
      TableName: TABLE_NAME,
      Key: { userId, fileId }
    }).promise();

    const item = result.Item;
    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "File not found" }),
      };
    }

    const url = s3.getSignedUrl('getObject', {
      Bucket: BUCKET_NAME,
      Key: item.s3Key,
      Expires: 300,
      ResponseContentDisposition: `attachment; filename="${item.filename}"`,
      ResponseContentType: item.mimeType
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
