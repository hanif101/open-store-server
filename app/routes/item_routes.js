/* eslint-disable */
//  NPM packages
const express = require('express')
const passport = require('passport')
const asyncHandler = require('express-async-handler')

// imports
const Item = require('../models/Item')
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
  '/index-items',
  asyncHandler(async (req, res, next) => {
    /*  */
    const response = await Item.find()
    handle404(response)

    res.status(200).json(response)
  })
)

// SHOW
// GET /show-item/:id
router.get(
  '/show-item/:id',
  asyncHandler(async (req, res, next) => {
    let item = await Item.findById(req.params.id).populate('owner')
    // check if dos exist
    handle404(item)
    res.status(200).json(item)
  })
)

// CREATE
// POST / electronics
router.post(
  '/create-item',
  requireToken,
  asyncHandler(async (req, res, next) => {
    // add owner and images
    req.body.owner = req.user._id
    req.body.imageUrl = []
    let product = await Item.create(req.body)

    // if no created
    if (!product) {
      throw new customErrors.BadCredentialsError()
    }
    res.status(201).json(product)
  })
)

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch(
  '/patch-item/:id',
  requireToken,
  removeBlanks,
  asyncHandler(async (req, res, next) => {

    Item.findById(req.params.id)
      .then(handle404)
      .then((res) => {
        // pass the `req` object and the Mongoose record to `requireOwnership`
        // it will throw an error if the current user isn't the owner
        requireOwnership(req, res)

        // pass the result of Mongoose's `.update` to the next `.then`
        return res.updateOne(req.body)
      })
      // if that succeeded, return 204 and no JSON
      .then(() => res.sendStatus(204))
      // if an error occurs, pass it to the handler
      .catch(next)
  })
)

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

/* Upload Images */
// POST or PATCH
// Update Profile Image

// router.patch(
//   '/item/:id',
//   requireToken,
//   createProduct.array('files', 10),
//   asyncHandler(async (req, res, next) => {
//     console.log(req.params)
//     let imageUrl = []
//     req.files.map((image) => {
//       let a = '/product_image/' + image.filename
//       imageUrl.push(a)
//     })

//     const response = await Item.findByIdAndUpdate(
//       req.params.id,
//       {
//         imageUrl
//       },
//       {
//         new: true,
//         runValidators: true
//       }
//     )

//     res.status(200).json(response)
//   })
// )

module.exports = router
