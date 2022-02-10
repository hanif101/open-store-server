//  NPM packages
const express = require('express')
const passport = require('passport')
const asyncHandler = require('express-async-handler')

// imports
const electronicsSchema = require('../models/electronics')
const customErrors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

// declarations
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router
const router = express.Router()

/*  C R U D  */

// INDEX
// GET /examples
// router.get('/examples', requireToken, asyncHandler(async (req, res, next) => {
//   electronicsMediaSchema.find()
//     .then(examples => {
//       // `examples` will be an array of Mongoose documents
//       // we want to convert each one to a POJO, so we use `.map` to
//       // apply `.toObject` to each one
//       return examples.map(example => example.toObject())
//     })
//     // respond with status 200 and JSON of the examples
//     .then(examples => res.status(200).json({ examples: examples }))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// }))

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
// router.get('/examples/:id', requireToken, (req, res, next) => {
//   // req.params.id will be set based on the `:id` in the route
//   electronicsMediaSchema.findById(req.params.id)
//     .then(handle404)
//     // if `findById` is succesful, respond with 200 and "example" JSON
//     .then(example => res.status(200).json({ example: example.toObject() }))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })

// CREATE
// POST /examples
router.post('/electronics-media', requireToken, asyncHandler(async (req, res, next) => {
  // add owner to data
  req.body.owner = req.user.id
  let data = await electronicsSchema.create(req.body)

  res.status(201).json({ example: data.toObject() })
}))

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
// router.patch('/examples/:id', requireToken, removeBlanks, (req, res, next) => {
//   // if the client attempts to change the `owner` property by including a new
//   // owner, prevent that by deleting that key/value pair
//   delete req.body.example.owner

//   Example.findById(req.params.id)
//     .then(handle404)
//     .then(example => {
//       // pass the `req` object and the Mongoose record to `requireOwnership`
//       // it will throw an error if the current user isn't the owner
//       requireOwnership(req, example)

//       // pass the result of Mongoose's `.update` to the next `.then`
//       return example.updateOne(req.body.example)
//     })
//     // if that succeeded, return 204 and no JSON
//     .then(() => res.sendStatus(204))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
// router.delete('/examples/:id', requireToken, (req, res, next) => {
//   Example.findById(req.params.id)
//     .then(handle404)
//     .then(example => {
//       // throw an error if current user doesn't own `example`
//       requireOwnership(req, example)
//       // delete the example ONLY IF the above didn't throw
//       example.deleteOne()
//     })
//     // send back 204 and no content if the deletion succeeded
//     .then(() => res.sendStatus(204))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })

module.exports = router
