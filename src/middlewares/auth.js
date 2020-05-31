const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization

	if(!authHeader) 
		return res.status(401).send()
	
	jwt.verify(authHeader, authConfig.appHash, (err, decoded) => {
		if (err) 
			return res.status(401).send()

		req.userId = decoded.id
		next()
	})
}