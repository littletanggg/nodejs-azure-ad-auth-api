const msal = require('@azure/msal-node');
const azureADConfig = require("../configs/azureAD.config");
const appConfig = require("../configs/app.config");

// Function to build the MSAL application instance
const buildMsalApp = () => {
    return new msal.ConfidentialClientApplication({
        auth: {
            clientId: azureADConfig.clientID,
            authority: azureADConfig.authorityUrl,
            clientSecret: azureADConfig.clientSecret,
        }
    });
}

// Function to get authorization code URL and redirect
const getAuthCodeUrl = async (authority, state) => {
    const authCodeRequest = {
        authority: authority,
        scopes: ['https://graph.microsoft.com/.default'],
        state: state,
        redirectUri: process.env.APP_REDIRECT_URI,
    };
    
    const msalApp = buildMsalApp();
    const response = await msalApp.getAuthCodeUrl(authCodeRequest);
    return response;
};

// Function to exchange authorization code for tokens
const exchangeCodeForTokens = async (authorizationCode) => {
    var scopeList = azureADConfig.scope.split(" ")

    try {
        const msalApp = buildMsalApp();
        const tokenResponse = await msalApp.acquireTokenByCode({
            code: authorizationCode,
            scopes: scopeList,
            redirectUri: appConfig.appRedirectUri
        });

        const { accessToken, idToken, expiresOn, idTokenClaims } = tokenResponse;
        const email = idTokenClaims.preferred_username;
        const name = idTokenClaims.name;

        return {
            access_token: accessToken,
            id_token: idToken,
            expiresOn: expiresOn,
            email: email,
            name: name
        };
    } catch (error) {
        console.error('Error acquiring token:', error);
        throw error;
    }
};

module.exports = {
    buildMsalApp,
    getAuthCodeUrl,
    exchangeCodeForTokens
};
