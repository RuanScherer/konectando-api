const Address = require("../models/Address");
const School = require("../models/School");

module.exports = {
	async store(req, res) {
		const { userId } = req
		const { city, district, street } = req.body

		const school = await School.findByPk(userId)
		if (!school) return res.status(400).send({ err: "School not found" })

		const address = await Address.create({
			city,
			district,
			street,
			school_id: userId
		})

		if (!address) return res.status(500).send({ err: "Server error" })
		return res.send({ address })
	},

	async update(req, res) {
		const { userId } = req
		const { city, district, street } = req.body

		const school = await School.findByPk(userId)
		if (!school) return res.status(400).send({ err: "School not found" })

		const address = await Address.update({
			city,
			district,
			street,
			school_id: userId
		}, {
			where: {
				school_id: userId
			}
		})

		if (!address) return res.status(500).send({ err: "Server error" })
		return res.send({ address })
	}
}