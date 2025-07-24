import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-north-1_qCHKa6FiW", 
  ClientId: "2oodo4tu3o0aurek7n79lc9e8", 
};

export default new CognitoUserPool(poolData);
