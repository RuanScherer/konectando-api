const express = require('express')
const router = require('./routes')
const cors = require('cors')
require('./database')

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(process.env.PORT || 3333, () => {
	console.log("App listening on port 3333")
})