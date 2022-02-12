const mongoose = require('mongoose')

const housingSchema = new mongoose.Schema({

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  purpose: {
    // rent or sell
    type: String,
    required: true
  },

  type: {
    // apartment or house
    type: String,
    required: true
  },

  bedrooms: {

    type: String,
    required: true
  },

  bathrooms: {
    type: String,
    required: true
  },

  price: {
    type: String,
    required: true
  },

  loation: {
    type: String
  },

  details: {
    type: String,
    required: true
  },

  imageUrl: []

}, {
  timestamps: true
})

module.exports = mongoose.model('Housing', housingSchema)
