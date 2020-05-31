const express = require('express')
const authMiddleware = require('./middlewares/auth')
const DonatorController = require('./controllers/DonatorController')

const router = express.Router()

router.post('/donators/register', DonatorController.store)
router.post('/donators/auth', DonatorController.sign)

router.use(authMiddleware)

router.delete('/donators', DonatorController.destroy)

module.exports = router