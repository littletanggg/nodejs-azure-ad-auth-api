const router = require('express').Router()

router.use('/azureAD', require('./azureAD.route'))

module.exports = router