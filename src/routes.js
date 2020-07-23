const express = require('express')
const authMiddleware = require('./middlewares/auth')
const DonatorController = require('./controllers/DonatorController')
const SchoolController = require('./controllers/SchoolController')
const AddressController = require('./controllers/AddressController')
const DonationController = require('./controllers/DonationController')

const router = express.Router()

router.post('/donators/register', DonatorController.store)
router.post('/donators/auth', DonatorController.sign)
router.post('/schools/register', SchoolController.store)
router.post('/schools/auth', SchoolController.sign)

router.use(authMiddleware)

router.get('/donators/account', DonatorController.show)
router.get('/donators/donations', DonationController.listByDonator)
router.put('/donators', DonatorController.update)
router.delete('/donators', DonatorController.destroy)
router.get('/schools', SchoolController.index)
router.get('/schools/donations', DonationController.listBySchool)
router.get('/schools/:id', SchoolController.show)
router.post('/schools/addresses', AddressController.store)
router.put('/schools', SchoolController.update)
router.put('/schools/addresses', AddressController.update)
router.post('/schools/:school_id/donate', DonationController.store)
router.get('/donations/:id', DonationController.show)
router.delete('/donations/:id', DonationController.destroy)

module.exports = router