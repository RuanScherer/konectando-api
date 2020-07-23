const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const Donator = require('../models/Donator')
const School = require('../models/School')
const Address = require('../models/Address')
const Donation = require('../models/Donation')

const connection = new Sequelize(dbConfig)

Donator.init(connection)
School.init(connection)
Address.init(connection)
Donation.init(connection)

School.associate(connection.models)
Address.associate(connection.models)
Donation.associate(connection.models)

module.exports = connection