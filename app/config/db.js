const Sequelize = require('sequelize');

module.exports = new Sequelize('formulas','root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || '3306'
});