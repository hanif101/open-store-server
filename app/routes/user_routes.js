//  NPM packages
const express = require('express')
const crypto = require('crypto')
const passport = require('passport')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

// imports
const { BadCredentialsError, BadParamsError } = require('../../lib/custom_errors')
const User = require('../models/user')
const upload = require('../../multer-mw/updateProfileImage')

const bcryptSaltRounds = 10
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

/* ASYNC AWAIT */

// POST
// SIGN UP
router.post(
  '/sign-up',
  asyncHandler(async (req, res, next) => {
    const { username, email, password, passwordConfirmation } = req.body.credentials

    // check inputs
    if (!username || !email || !password || password !== passwordConfirmation) {
      throw new BadParamsError()
    }

    // hash password - returns promise
    const hashed = await bcrypt.hash(req.body.credentials.password, bcryptSaltRounds)

    // create
    const user = await User.create({
      username,
      email,
      hashedPassword: hashed,
      avatar: process.env.SERVER + '/uploads/' + 'default.jpeg'
    })

    // response
    res.status(201).json({ user: user.toObject() })
  })
)

// POST
// SIGN IN
router.post(
  '/sign-in',
  asyncHandler(async (req, res, next) => {
    const { password, username } = req.body.credentials

    // gets user from db
    const user = await User.findOne({ username })

    // if no user
    if (!user) {
      throw new BadCredentialsError()
    }

    // check that the password is correct
    let correctPassword = await bcrypt.compare(password, user.hashedPassword)

    if (correctPassword) {
      // generate token
      const token = crypto.randomBytes(16).toString('hex')
      user.token = token

      // save user
      await user.save()
    } else {
      //  if error
      throw new BadCredentialsError()
    }

    // response
    res.status(200).json({ user: user.toObject() })
  })
)

// PATCH
// CHANGE password
router.patch(
  '/change-password',
  requireToken,
  asyncHandler(async (req, res, next) => {
    const { passwords } = req.body

    // gets user from db
    const user = await User.findById(req.user.id)

    // check that the old password is correct
    const correctPassword = await bcrypt.compare(passwords.old, user.hashedPassword)

    if (!passwords.new || !correctPassword) {
      throw new BadParamsError()
    }

    // hash new password
    const newPass = await bcrypt.hash(passwords.new, bcryptSaltRounds)

    // set it to user
    user.hashedPassword = newPass

    // save user
    await user.save()

    // response
    res.sendStatus(204)
  })
)

// DELETE
// SIGN OUT
router.delete(
  '/sign-out',
  requireToken,
  asyncHandler(async (req, res, next) => {
    // create a new random token for the user, invalidating the current one
    console.log(req.user)
    req.user.token = crypto.randomBytes(16).toString('hex')

    // save the token and respond with 204
    await req.user.save()

    res.sendStatus(204)
  })
)

/* AVATAR */
// PATCH
// Update Profile Image
router.post(
  '/avatar',
  requireToken,
  upload.single('avatar'),
  asyncHandler(async (req, res, next) => {
    const response = await User.findByIdAndUpdate(req.user._id, {
      'avatar': process.env.SERVER + '/uploads/' + req.avatar
    }, {
      new: true,
      runValidators: true
    })

    res.status(200).json(response)
  })

)

module.exports = router
