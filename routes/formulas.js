const express = require('express');
const Formula = require('../models/formula');
const Ingredient = require('../models/ingredient');
const router = express.Router();

// @dec     get all formulas
// @route   /formulas
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    let formulas = await Formula.find().lean();
    
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
    })

    res.redirect('/formulas')

  } catch (err) {
    res.render('formulas', {error: 'Ha ocurrido un error'})
    console.log(err)
  }
});

// @dec     Display Add ingredients view
// @route   GET /formulas/add-ingredients/:formulaId
// @access  Public
router.get('/add-ingredients/:formulaId', async (req, res, next) => {
  try{
    const formulaId = req.params.formulaId
    const formula = await Formula.findById(formulaId).lean()
    const ingredients = await Ingredient.find({formula: formulaId}).lean()

    res.render('addIngredients', {
      ingredients,
      formula
    })
  }catch(err){
    console.log(err)
  }
});

// @dec     Add new ingredient to selected formula
// @route   POST /formulas/add-ingredients
// @access  Public
router.post('/add-ingredients', async (req, res, next) => {
  try{
    await Ingredient.create({
      name: req.body.name,
      unit: req.body.unit,
      formula: req.body.formulaId 
    })

    res.redirect(`/formulas/add-ingredients/${req.body.formulaId }`)
  } catch(err){
    console.log(err)
  }   
});

// @dec     Edit ingredient
// @route   POST /formulas/edit-ingredients/:ingredientId
// @access  Public
router.post('/edit-ingredients/:ingredientId', async (req, res, next) => {
  try {
    let ingredient = await Ingredient.findOneAndUpdate(
      {_id: req.params.ingredientId},
      req.body,
      {new: true, runValidators: true}
    );

    res.redirect(`/formulas/add-ingredients/${ingredient.formula}`)
  } catch (err) {
    console.log(err)
  }
});

// @dec     Delete ingredient
// @route   POST /formulas/delete-ingredients/:ingredientId
// @access  Public
router.post('/delete-ingredients/:ingredientId', async (req, res, next) => {
  try {
    const ingredientId = req.params.ingredientId
    const ingredient = await Ingredient.findByIdAndDelete(ingredientId)

    const formulaId = ingredient.formula;

    res.redirect(`/formulas/add-ingredients/${formulaId}`)
  } catch (err) {
    console.log(err)
  }
});

// @dec     Delete formula
// @route   POST /formulas/delete/:formulaId
// @access  Public
router.post('/delete/:formulaId', async (req, res, next) => {
    try {
      const formulaId = req.params.formulaId
      await Formula.findByIdAndDelete(formulaId)

      res.redirect('/formulas')
    } catch (err) {
      console.log(err)
    }
})

module.exports = router;
