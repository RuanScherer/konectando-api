const School = require('../models/School')
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
	async index(req, res) {
		School.findAll()
			.then((schools) => { res.send({ schools }) })
			.catch((err) => res.status(400).send({ err }))
	},

	async store(req, res) {
		const { name, email, phone, password } = req.body

		if (password.length < 8 || phone.length < 10) return res.status(400).send()

		const school = await School.findOne({
			where: {
				[Op.or]: [
					{ name: name },
					{ email: email },
					{ phone: phone }
				]
			}
		})

		if (school) return res.status(400).send()

		School.create({ name, email, phone, password })
			.then((school) => {
				clearSensitiveData(school)
				return res.json({
					school,
					token: generateToken({ id: school.id })
				})
			})
			.catch((err) => res.status(500).send({ err }))
	},

	async sign(req, res) {
		const { email, password } = req.body
		const school = await School.findOne({
			where: {
				email
			}
		})

		if (!school || !await bcrypt.compare(password, school.password)) return res.status(400).send()

		clearSensitiveData(school)
		return res.json({
			school,
			token: generateToken({ id: school.id })
		})
	},
}