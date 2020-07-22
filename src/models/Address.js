const { Model, DataTypes } = require('sequelize')

class Address extends Model {
	static init(connection) {
		super.init({
			city: DataTypes.STRING,
			district: DataTypes.STRING,
			street: DataTypes.STRING
		}, {
			sequelize: connection
		})
	}

	static associate(models) {
		this.belongsTo(models.School, { foreignKey: 'school_id', as: 'address-owner' })
	}
}

module.exports = Address