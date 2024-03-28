require('dotenv').config()

module.exports = {
  authorityDomain: process.env.AUTHORITY_DOMAIN,
  authorityUrl: process.env.AUTHORITY_URL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectLoginUrl: process.env.REDIRECT_LOGIN_URL,
  redirectLogoutUrl: process.env.REDIRECT_LOGOUT_URL,
  scope: process.env.SCOPE,
  tenantID: process.env.TENANT_ID,
  appRedirectUri: process.env.APP_REDIRECT_URI
}