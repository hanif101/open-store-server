'use strict'

// creating a base name for the mongodb
const mongooseBaseName = 'express-server'

// create the mongodb uri for development and test
const database = {
  // set this to mongodb atlas after  .env file created
  development: `${process.env.DB_URI}`,
  test: `mongodb://localhost/${mongooseBaseName}-test`
}

// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
const localDb = process.env.TESTENV ? database.test : database.development

// Environment variable DB_URI will be available in
// heroku production evironment otherwise use test or development db
const currentDb = process.env.DB_URI || localDb

module.exports = currentDb
