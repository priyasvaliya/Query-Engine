import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_TSimgfdR5",
    ClientId: "78c53cv78vuo38sbdjp9coabgu"
}

export default new CognitoUserPool(poolData);