const Sequelize = require('sequelize');
const db = require('../config/db');

const Formula = db.define('formula', {
  name: {
    type: Sequelize.STRING
  },
  unit: {
    type: Sequelize.DOUBLE
  },
});

module.exports = Formula;