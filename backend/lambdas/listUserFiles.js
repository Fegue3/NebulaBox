const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'NebulaFiles';

exports.handler = async (event) => {
  try {
    const userId = event.requestContext.authorizer.claims.sub;

    const result = await dynamo.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'userId = :uid',
      ExpressionAttributeValues: {
        ':uid': userId
      }
    }).promise();

    const files = result.Items.map(item => ({
      fileId: item.fileId,
      filename: item.filename,
      uploadDate: item.uploadDate,
      size: item.size,
      mimeType: item.mimeType
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(files),
    };
  } catch (err) {
    console.error('Erro ao listar ficheiros:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno ao buscar ficheiros' }),
    };
  }
};
