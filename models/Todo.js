const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },
  done: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // select: false
  }
})

module.exports = mongoose.model('Todo', TodoSchema)