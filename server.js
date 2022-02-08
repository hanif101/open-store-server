// NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// create .env file for private db || apis
require('dotenv').config()

// imports
const db = require('./config/db')
const auth = require('./lib/auth')
const errorHandler = require('./lib/error_handler')
const requestLogger = require('./lib/request_logger')

// routes
const userRoutes = require('./app/routes/user_routes')

// ports
const serverDevPort = 3040
const clientDevPort = 7165

// database connection
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(console.log('MongoDB connection successfull'))

// app & server created
const app = express()

// cors
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// register passport authentication middleware
app.use(auth)
app.use(express.json())

// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// route files
app.use(userRoutes)

// error Handler
app.use(errorHandler)

app.listen(serverDevPort, () => {
  console.log('Server running on port', serverDevPort)
})

// needed just for testing
module.exports = app
