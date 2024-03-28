const router = require('express').Router()
const config = require('../configs/app.config')

router.use(`/api/v${config.apiVersion}`, require('./api'))

module.exports = router