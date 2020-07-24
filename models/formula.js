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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Formula', FormulaSchema);
