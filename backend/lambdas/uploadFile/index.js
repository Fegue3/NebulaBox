//Upload file to S3 and store metadata in DynamoDB
// This Lambda function generates a presigned URL for uploading files to S3 and stores file metadata

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
AWS.config.update({ region: 'eu-north-1' });

const s3 = new AWS.S3();
const dynamo = new AWS.DynamoDB.DocumentClient();

const BUCKET_NAME = 'nebulabox-user-files';
const TABLE_NAME = 'NebulaFiles';

exports.handler = async (event) => {
  try {
    console.log("EVENT:", JSON.stringify(event, null, 2));
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    const body = JSON.parse(event.body);
    const { filename, mimeType, size } = body;

if (!filename || !mimeType || !size) {
  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Dados inválidos' }),
  };
}

const sanitizedMimeType = mimeType.trim().toLowerCase();


    const fileId = uuidv4();
    const s3Key = `${userId}/${fileId}-${filename}`;

    const presignedUrl = s3.getSignedUrl('putObject', {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      ContentType: sanitizedMimeType,
      Expires: 300,
    });

    await dynamo.put({
      TableName: TABLE_NAME,
      Item: {
        userId,
        fileId,
        filename,
        uploadDate: new Date().toISOString(),
        size,
        mimeType,
        s3Key
      }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Presigned URL gerado com sucesso',
        url: presignedUrl,
        fileId: fileId
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao gerar presigned URL' }),
    };
  }
};
