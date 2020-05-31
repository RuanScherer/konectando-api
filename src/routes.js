const express = require('express')
const authMiddleware = require('./middlewares/auth')

const router = express.Router()

router.get('/', (req, res) => res.send("Hello, World"))

router.use(authMiddleware)

module.exports = router