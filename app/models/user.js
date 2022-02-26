const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    hashedPassword: {
      type: String,
      required: true
    },

    token: {
      type: String
    },

    avatar: {
      type: Buffer
    },

    pfpType: {
      type: String
    }

  },

  {
    timestamps: true,
    toObject: {
      // remove `hashedPassword` field when we call `.toObject`
      transform: (_doc, user) => {
        delete user.hashedPassword
        return user
      }
    }
  }
)

userSchema.methods.getBuffer = function () {
  if (!this.avatar) {
    return false
  }
  return this.avatar
}

module.exports = mongoose.model('User', userSchema)
