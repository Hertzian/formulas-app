const express = require('express');
const router = express.Router();
const db = require('../config/db')
const Formula = require('../models/formula');
const Ingredient = require('../models/ingredient');

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
    // console.log(req.body.name)
    // console.log(req.body.unit)

    Formula.create({
        name: req.body.name,
        unit: req.body.unit
    })
    .then(result => {
        console.log('formula added')
        res.redirect('/formulas')
    })
    .catch(err => console.error(err))
});

// @dec     Display Add ingredients view
// @route   GET /formulas/add-ingredients/:formulaId
// @access  Public
router.get('/add-ingredients/:formulaId', (req, res, next) => {
    const formulaId = req.params.formulaId;

    Ingredient.findAll({where: {formulaId: formulaId}})
        .then(ingredients => {
            return ingredients;
        })
        .then()
        .catch(err => console.log(err))


    Formula.findByPk(formulaId)
        .then(formula => {
            return formula
                .getIngredients()
                .then(ingredients => {
                    // console.log(ingredients)

                    res.render('addIngredients', {
                        id: formula.id,
                        name: formula.name,
                        ingredients: ingredients
                    });
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

});

// @dec     Add new ingredient to selected formula
// @route   POST /formulas/add-ingredients
// @access  Public
router.post('/add-ingredients', (req, res, next) => {
    const formulaId = req.body.formulaId;
    const {name, unit} = req.body;

    Ingredient.create({
        name: name,
        unit: unit,
        formulaId: formulaId
    })
    .then(result => {
        console.log('Ingredient added')
        res.redirect(`/formulas/add-ingredients/${formulaId}`)
    })
    .catch(err => console.error(err))
});

module.exports = router;