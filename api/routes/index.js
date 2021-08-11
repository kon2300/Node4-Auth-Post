const express = require('express')
const router = express.Router()

router.use('/auth', require('./authRoutes'))
router.use('/post', require('./postRoutes'))

module.exports = router
