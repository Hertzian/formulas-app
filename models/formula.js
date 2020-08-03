const mongoose = require('mongoose');

const FormulaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Es necesario un nombre']
  },
  unit: {
    type: String,
    required: [true, 'Es necesario un nombre']
  },
  quantity: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Formula', FormulaSchema);
