const School = require('../models/School')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const bcrypt = require('bcryptjs')
const { show } = require('./DonatorController')

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
			.then((schools) => { 
				schools.forEach((school) => {
					clearSensitiveData(school)
				})
				return res.send({ schools })
			})
			.catch((err) => res.status(400).send({ err }))
	},

	async store(req, res) {
		const { name, email, phone, hour, password } = req.body

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

		School.create({ name, email, phone, hour, password })
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

	async show(req, res) {
		const { id } = req.params
		if (!id) return res.status(400).send("Id param required.")

		const school = await School.findByPk(id, {
			include: {
				association: 'addresses'
			}
		})

		if (!school) return res.status(400).send("School not found.")
		school.password = undefined
		return res.json({ school })
	}
}