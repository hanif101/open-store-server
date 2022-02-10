const mongoose = require('mongoose')

const electronicsSchema = new mongoose.Schema({

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  title: {
    type: String,
    required: true
  },

  price: {
    type: String,
    required: true
  },

  location: {
    type: String
  },

  details: {
    type: String,
    required: true
  },

  imageUrl: {
    type: Buffer
  }

}, {
  timestamps: true
})

module.exports = mongoose.model('Electronics & Media', electronicsSchema)
