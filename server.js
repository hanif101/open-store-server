// NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

// create .env file for private db || apis
require('dotenv').config()

// imports
const db = require('./config/db')
const auth = require('./lib/auth')
const errorHandler = require('./lib/error_handler')
const requestLogger = require('./lib/request_logger')

// routes
const userRoutes = require('./app/routes/user_routes')
const itemRoutes = require('./app/routes/item_routes')
const vehicleRoutes = require('./app/routes/vehicle_routes')

// ports
const serverDevPort = 3040
const clientDevPort = 7165

// database connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(console.log('DB connection successfull'))

// app & server created
const app = express()

// cors
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
    credentials: true
  })
)

// app.use()
// register passport authentication middleware
app.use(auth)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(session({
  key: 'userId',
  secret: '123456789',
  resave: 'false',
  saveUninitialized: false,
  cookie: {
    expires: 1000 * 60 * 60 /* 1 hour */ * 24 /* 24 hour */
  }
}))

// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// route files
app.use(userRoutes)
app.use(itemRoutes)
app.use(vehicleRoutes)

// error Handler
app.use(errorHandler)

app.listen(serverDevPort, () => {
  console.log('Server running on port', serverDevPort)
})

// needed just for testing
module.exports = app
