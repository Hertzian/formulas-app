const Sequelize = require('sequelize');
const db = require('../config/db');

const Recipt = db.define('recipts', {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    units:{
        type: Sequelize.STRING,
        validate: {
            isNumeric: true
        }
    },
    createdAt:{
        type: Date,
        validate: {
            isDate: true
        }
    }
});

module.exports = Recipt;