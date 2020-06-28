const Sequelize = require('sequelize');

module.exports = new Sequelize('formulas','root', null, {
    host: 'localhost',
    dialect: 'mysql',
    port:  '3306' || process.env.DB_PORT
});