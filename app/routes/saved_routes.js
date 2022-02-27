/* eslint-disable */
//  NPM packages
const express = require('express')
const passport = require('passport')
const asyncHandler = require('express-async-handler')

// imports
const User = require('../models/user')
const customErrors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')
const createProduct = require('../../multer-mw/createProductsImages')

// declarations
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router
const router = express.Router()

/*  C R U D  */

// INDEX
// GET / electornics
router.get(
  '/index-saved',
  requireToken,
  asyncHandler(async (req, res, next) => {
    /*  */
    const user = await User.findById(req.user._id).populate('saved')
    handle404(user)

    res.status(200).json(user)
  })
)

// SHOW
// GET /show-item/:id
// router.get(
//   '/show-item/:id',
//   asyncHandler(async (req, res, next) => {
//     let item = await Item.findById(req.params.id).populate('owner')
//     // check if dos exist
//     handle404(item)
//     res.status(200).json(item)
//   })
// )

// CREATE
// POST / electronics
router.post(
  '/create-saved',
  requireToken,
  asyncHandler(async (req, res, next) => {
    // add owner and images
 
    let user = await User.findById(req.user._id)

    console.log(user)
    if(!user) { throw new customErrors.BadCredentialsError()}

    await user.saved.push(req.body.item_id)
    await user.save()

    res.status(201).json(user)
  })
)

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
// router.patch(
//   '/patch-item/:id',
//   requireToken,
//   removeBlanks,
//   asyncHandler(async (req, res, next) => {
//     Item.findById(req.params.id)
//       .then(handle404)
//       .then((res) => {
//         // pass the `req` object and the Mongoose record to `requireOwnership`
//         // it will throw an error if the current user isn't the owner
//         requireOwnership(req, res)

//         // pass the result of Mongoose's `.update` to the next `.then`
//         return res.updateOne(req.body)
//       })
//       // if that succeeded, return 204 and no JSON
//       .then(() => res.sendStatus(204))
//       // if an error occurs, pass it to the handler
//       .catch(next)
//   })
// )

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete(
  '/delete-saved/:id',
  requireToken,
  asyncHandler(async (req, res, next) => {
    User.findById(req.user._id)
      .then(handle404)
      .then(async (user) => {

        user.saved = user.saved.filter(id=> id != req.params.id)
         
        return user.save()
      })
      // send back 204 and no content if the deletion succeeded
      .then(() => res.sendStatus(204))
      // if an error occurs, pass it to the handler
      .catch(next)
  })
)

module.exports = router
