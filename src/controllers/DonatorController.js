const Donator = require('../models/Donator')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const bcrypt = require('bcryptjs')

function clearSensitiveData(model) {
	model.password = undefined
}

function generateToken(params) {
	return jwt.sign(params, authConfig.appHash, {
		expiresIn: 86400
	})
}

module.exports = {
	async store(req, res) {
		const { name, email, phone, password } = req.body

		if (password.length < 8 || phone.length < 10) return res.status(400).send()

		const donator = await Donator.findOne({
			where: {
				[Op.or]: [
					{ name: name },
					{ email: email }
				]
			}
		})

		if (donator) return res.status(400).send()

		await Donator.create({ name, email, phone, password })
			.then((donator) => {
				clearSensitiveData(donator)
				return res.json({
					donator,
					token: generateToken({ id: donator.id })
				})
			})
			.catch(() => {
				return res.status(500).send()
			})
	},

	async sign(req, res) {
		const { email, password } = req.body
		const donator = await Donator.findOne({
			where: {
				email
			}
		})

		if (!donator || !await bcrypt.compare(password, donator.password)) return res.status(400).send()

		clearSensitiveData(donator)
		return res.json({
			donator,
			token: generateToken({ id: donator.id })
		})
	},

	async destroy(req, res) {
		const donator = await Donator.findByPk(req.userId)

		if (!donator) return res.status(400).send()

		Donator.destroy({
			where: {
				id: req.userId
			}
		}).then(() => {
			return res.send()
		}).catch(() => {
			return res.status(400).send()
		})
	}
}