const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  type: {
    type: String,
    required: true
  },

  make: {
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

module.exports = mongoose.model('Vehicle', vehicleSchema)
