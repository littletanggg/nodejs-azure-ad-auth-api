require('dotenv').config()

module.exports = {
  appRedirectUri: process.env.APP_REDIRECT_URI || 'http://localhost:3000/api/v1/redirect',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  isProduction: process.env.NODE_ENV === 'production',
  apiVersion: process.env.API_VERSION || 1,
  token_exp_days: process.env.TOKEN_EXP_DAYS || 1,
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'my-secret',
  mongodbUri: process.env.MONGODB_URI,
  pageLimit: process.env.PAGE_LIMIT || 15
}