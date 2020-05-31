const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

class Donator extends Model {
	static init(connection) {
		super.init({
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			phone: DataTypes.STRING,
			password: DataTypes.STRING
		}, {
			hooks: {
		    beforeCreate: async (donator, options) => {
		      const hash = await bcrypt.hash(donator.password, 10)
		      donator.password = hash
		    }
		  },
			sequelize: connection
		})
	}
}

module.exports = Donator