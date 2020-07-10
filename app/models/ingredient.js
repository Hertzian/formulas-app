const Sequelize = require('sequelize');
const db = require('../config/db');

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING
  },
  unit: {
    type: Sequelize.DOUBLE
  },
});

module.exports = Ingredient;