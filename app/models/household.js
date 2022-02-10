const mongoose = require('mongoose')

const householdSchema = new mongoose.Schema({

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

  loation: {
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

module.exports = mongoose.model('HouseHold & Essential', householdSchema)
