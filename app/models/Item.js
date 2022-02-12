const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({

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

  imageUrl: []

}, {
  timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)
