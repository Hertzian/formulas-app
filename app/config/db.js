const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('formulas',' root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;