const express = require('express')
const authMiddleware = require('./middlewares/auth')
const DonatorController = require('./controllers/DonatorController')
const SchoolController = require('./controllers/SchoolController')

const router = express.Router()

router.post('/donators/register', DonatorController.store)
router.post('/donators/auth', DonatorController.sign)
router.post('/schools/register', SchoolController.store)
router.post('/schools/auth', SchoolController.sign)

router.use(authMiddleware)

router.get('/donators/:id', DonatorController.show)
router.put('/donators', DonatorController.update)
router.delete('/donators', DonatorController.destroy)
router.get('/schools', SchoolController.index)

module.exports = router