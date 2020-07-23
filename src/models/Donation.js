const { Model, DataTypes } = require('sequelize')

class Donation extends Model {
	static init(connection) {
		super.init({
			quantity: DataTypes.INTEGER,
			description: DataTypes.STRING
		}, {
			sequelize: connection
		})
	}

	static associate(models) {
		this.belongsTo(models.School, { foreignKey: 'school_id', as: 'receptor' })
		this.belongsTo(models.Donator, { foreignKey: 'donator_id', as: 'donator' })
	}
}

module.exports = Donation