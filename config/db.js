const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT
}); 

// test db conn
// (async () => {
//     try {
//         await conn.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })();

module.exports = conn;