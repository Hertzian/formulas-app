const express = require('express');
const router = express.Router();
// const db = require('../config/db')
// const Formula = require('../models/formula');
// const Ingredient = require('../models/ingredient');

// @dec     get all formulas
// @route   /formulas
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        let formulas = await Formula.findAll();
        
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
        await Formula.create({
            name: req.body.name,
            unit: req.body.unit
        });
        setTimeout(() => {
            res.redirect('/formulas');
        }, 500);
    } catch (err) {
        console.log(err)
    }
});

// @dec     Display Add ingredients view
// @route   GET /formulas/add-ingredients/:formulaId
// @access  Public
router.get('/add-ingredients/:formulaId', async (req, res, next) => {
    try {
        const formulaId = req.params.formulaId;
        const formula = await Formula.findByPk(formulaId);

        const ingredients = await Ingredient.findAll({
            where: {formulaId: formulaId}
        });

        res.render('addIngredients', {
            id: formula.id,
            name: formula.name,
            ingredients: ingredients
        });
        
    } catch (err) {
        console.log(err)
    }
});

// @dec     Add new ingredient to selected formula
// @route   POST /formulas/add-ingredients
// @access  Public
router.post('/add-ingredients', async (req, res, next) => {
    try {
        const formulaId = req.body.formulaId;
        const {name, unit} = req.body;
    
        await Ingredient
            .create({
                name: name,
                unit: unit,
                formulaId: formulaId
            });

        res.redirect(`/formulas/add-ingredients/${formulaId}`)
    } catch (err) {
        console.log(err);        
    }
});

// @dec     Edit ingredient
// @route   POST /formulas/edit-ingredients/:ingredientId
// @access  Public
router.post('/edit-ingredients/:ingredientId', async (req, res, next) => {
    try {
        const ingredientId = req.params.ingredientId;
        let ingredient = await Ingredient.findByPk(ingredientId);
        ingredient.update({unit: req.body.unit});
    
        setTimeout(() => {
            res.redirect(`/formulas/add-ingredients/${ingredient.formulaId}`)
        }, 500);
    } catch (err) {
        console.log(err)
    }
});

// @dec     Delete ingredient
// @route   POST /formulas/delete-ingredients/:ingredientId
// @access  Public
router.post('/delete-ingredients/:ingredientId', async (req, res, next) => {
    try {
        const ingredientId = req.params.ingredientId;
        const ingredient = await Ingredient.findByPk(ingredientId)
        ingredient.destroy();
    
        setTimeout(() => {
            res.redirect(`/formulas/add-ingredients/${ingredient.formulaId}`)
        }, 500);
        
    } catch (err) {
        console.log(err)
    }
});

// @dec     Delete formula
// @route   POST /formulas/delete/:formulaId
// @access  Public
router.post('/delete/:formulaId', async (req, res, next) => {
    try {
        const formulaId = req.params.formulaId;
        const formula = await Formula.findByPk(formulaId);
        formula.destroy();

        setTimeout(() => {
            res.redirect('/formulas')
        }, 500);
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;