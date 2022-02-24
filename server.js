/* eslint-disable */
// NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')


// const cookieParser = require('cookie-parser')
// const session = require('express-session')
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
const port = process.env.PORT || serverDevPort

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
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`
  })
)

// register passport authentication middleware
app.use(auth)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))


// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// route files
app.get('/', (req,res)=> res.render("hello world"))
app.use(userRoutes)
app.use(itemRoutes)
app.use(vehicleRoutes)

// error Handler
app.use(errorHandler)

app.listen(port, () => {
  console.log('Server running on port, version 4', serverDevPort)
})

// needed just for testing
module.exports = app
