const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const Donator = require('../models/Donator')

const connection = new Sequelize(dbConfig)

Donator.init(connection)

module.exports = connection