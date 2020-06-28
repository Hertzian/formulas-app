const express = require('express');
const router = express.Router();
const db = require('../config/db')
const Formula = require('../models/formula');

// @dec     get all formulas
// @route   /formulas
// @access  Public
router.get('/', (req, res, next) => {
    Formula.findAll()
        .then(formulas => {
            res.render('formulas', {
                formulas
            });
        })
        .catch(err => console.error(err.message))
});

// @dec     Display Create formula view
// @route   GET /formulas/create
// @access  Public
router.get('/add', (req, res, next) => {
    res.render('addFormula');
})


// @dec     Create formula
// @route   POST /formulas/create
// @access  Public
router.post('/add', (req, res, next) => {
    const data = {
        name: 'Melcocha',
        unit: '18'
    }

    let {name, unit} = data;

    // Insert into table
    Formula.create({
        name,
        unit
    })
    .then(formula => {
        res.redirect('/formulas')
    })
    .catch(err => console.error(err))

});

module.exports = router;