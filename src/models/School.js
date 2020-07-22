const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

class School extends Model {
	static init(connection) {
		super.init({
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			phone: DataTypes.STRING,
			hour: DataTypes.STRING,
			password: DataTypes.STRING
		}, {
			hooks: {
		    beforeCreate: async (school, options) => {
		      const hash = await bcrypt.hash(school.password, 10)
		      school.password = hash
		    }
		  },
			sequelize: connection
		})
	}

	static associate(models) {
		this.hasMany(models.Address, { foreignKey: 'school_id', as: 'addresses' })
	}
}

module.exports = School