const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Es necesario un nombre']
  },
  unit: {
    type: String,
    required: [true, 'Es necesario un nombre']
  },
  formula: {
    type: mongoose.Schema.ObjectId,
    ref: 'Formula'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ingredient', IngredientSchema);