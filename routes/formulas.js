const express = require('express');
const Formula = require('../models/formula');
const Ingredient = require('../models/ingredient');
const router = express.Router();

// @dec     get all formulas
// @route   /formulas
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        let formulas = await Formula.find();
        console.log(formulas);

        // formulas.forEach(formula => console.log(formula.name))
        
        res.render('formulas', {
            formulas
        });
    } catch (err) {
        console.log(err)
    }
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
router.post('/add', async (req, res, next) => {
    try {
        console.log(req.body.name)
        console.log(req.body.unit)
        // const formula = await Formula.create(req.body);


        res.render('formulas', {
            message: 'Se agregó una fórmula'
        })

        console.log(message)
    } catch (err) {
        res.render('formulas', {error: 'Ha ocurrido un error'})
        console.log(err)
    }
});

// @dec     Display Add ingredients view
// @route   GET /formulas/add-ingredients/:formulaId
// @access  Public
router.get('/add-ingredients/:formulaId', async (req, res, next) => {
    
});

// @dec     Add new ingredient to selected formula
// @route   POST /formulas/add-ingredients
// @access  Public
router.post('/add-ingredients', async (req, res, next) => {
    
});

// @dec     Edit ingredient
// @route   POST /formulas/edit-ingredients/:ingredientId
// @access  Public
router.post('/edit-ingredients/:ingredientId', async (req, res, next) => {
    
});

// @dec     Delete ingredient
// @route   POST /formulas/delete-ingredients/:ingredientId
// @access  Public
router.post('/delete-ingredients/:ingredientId', async (req, res, next) => {
    
});

// @dec     Delete formula
// @route   POST /formulas/delete/:formulaId
// @access  Public
router.post('/delete/:formulaId', async (req, res, next) => {
    
})

module.exports = router;