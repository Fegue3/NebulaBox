const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  const userPoolId = event.userPoolId;
  const username = event.userName;

  try {
    await cognito.adminUpdateUserAttributes({
      UserPoolId: userPoolId,
      Username: username,
      UserAttributes: [
        {
          Name: 'custom:plan',
          Value: 'free'
        }
      ]
    }).promise();

    console.log(`✅ Plano 'free' atribuído ao utilizador ${username}`);
    return event;
  } catch (err) {
    console.error('❌ Erro ao definir plano:', err);
    throw err;
  }
};
