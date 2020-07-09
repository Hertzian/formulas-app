const Sequelize = require('sequelize');

const conn = new Sequelize('formulas','root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT
}); 

// test db conn
(async () => {
    try {
        await conn.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = conn;