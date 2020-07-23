const Donation = require("../models/Donation");
const School = require("../models/School");
const Donator = require("../models/Donator");

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
	}
}