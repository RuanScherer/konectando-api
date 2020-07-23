const Donation = require("../models/Donation");
const School = require("../models/School");
const Donator = require("../models/Donator");
const { show } = require("./DonatorController");

function clearSensitiveData(array, type) {
	return newArray = array.map(element => {
		if (type === "receptor") {
			element.receptor.password = undefined
		}
		else if (type === "donator") {
			element.donator.password = undefined
		}
		return element
	})
}

module.exports = {
	async store(req, res) {
		const { userId } = req
		const { school_id } = req.params
		const { quantity, description } = req.body

		const school = await School.findByPk(school_id)
		if (!school) return res.status(400).send({ err: "School not found" })

		const donator = await Donator.findByPk(userId)
		if (!donator) return res.status(400).send({ err: "Donator not found" })

		const donation = await Donation.create({
			quantity,
			description,
			school_id,
			donator_id: userId
		})

		if (!donation) return res.status(500).send({ err: "Server error" })
		return res.send({ donation })
	},

	async listByDonator(req, res) {
		const { userId } = req

		let donations = await Donation.findAll({
			where: {
				donator_id: userId
			},
			include: {
				association: "receptor"
			}
		})

		donations = clearSensitiveData(donations, "receptor")

		if (!donations) return res.status(500).send({ err: "Server error" })
		return res.send({ donations })
	},

	async listBySchool(req, res) {
		const { userId } = req

		let donations = await Donation.findAll({
			where: {
				school_id: userId
			},
			include: {
				association: "donator"
			}
		})

		donations = clearSensitiveData(donations, "donator")

		if (!donations) return res.status(500).send({ err: "Server error" })
		return res.send({ donations })
	},

	async show(req, res) {
		const { userId } = req
		const { id } = req.params

		let donation = await Donation.findByPk(id, {
			include: [
				{ 
					association: 'receptor',
					include: {
						association: 'addresses'
					}
				},
				{ association: 'donator' }
			]
		})

		if (userId !== donation.receptor.id & userId !== donation.donator.id) return res.status(400).send()

		donation.receptor.password = undefined
		donation.donator.password = undefined

		if (!donation) return res.status(400).send()
		return res.send({ donation })
	}
}