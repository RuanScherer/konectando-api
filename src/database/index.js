const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const Donator = require('../models/Donator')
const School = require('../models/School')

const connection = new Sequelize(dbConfig)

Donator.init(connection)
School.init(connection)

module.exports = connection