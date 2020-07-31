const express = require('express')
const router = express.Router()
const {checkAuth} = require('../middlewares/auth')
const Formula = require('../models/formula')
const Ingredient = require('../models/ingredient')

// @dec     Display Add ingredients view
// @route   GET /ingredients/add-ingredients/:formulaId
// @access  Private
router.get('/add-ingredients/:formulaId', checkAuth, async (req, res, next) => {
  try{
    const formulaId = req.params.formulaId
    const ingredients = await Ingredient.find({formula: formulaId}).populate('formula').lean()
    const formula = await Formula.findById(formulaId).lean()

    res.render('addIngredients', {
      ingredients,
      formula
    })
  }catch(err){
    console.log(err)
  }
});

// @dec     Add new ingredient to selected formula
// @route   POST /ingredients/add-ingredients
// @access  Private
router.post('/add-ingredients', checkAuth, async (req, res, next) => {
  try{
    await Ingredient.create({
      name: req.body.name,
      unit: req.body.unit,
      formula: req.body.formulaId 
    })

    res.redirect(`/ingredients/add-ingredients/${req.body.formulaId }`)
  } catch(err){
    console.log(err)
  }   
});

// @dec     Edit ingredient
// @route   POST /ingredients/edit-ingredients/:ingredientId
// @access  Private
router.post('/edit-ingredients/:ingredientId', checkAuth, async (req, res, next) => {
  try {
    let ingredient = await Ingredient.findOneAndUpdate(
      {_id: req.params.ingredientId},
      req.body,
      {new: true, runValidators: true}
    );

    res.redirect(`/ingredients/add-ingredients/${ingredient.formula}`)
  } catch (err) {
    console.log(err)
  }
});

// @dec     Delete ingredient
// @route   POST /ingredients/delete-ingredients/:ingredientId
// @access  Private
router.post('/delete-ingredients/:ingredientId', checkAuth, async (req, res, next) => {
  try {
    const ingredientId = req.params.ingredientId
    const ingredient = await Ingredient.findByIdAndDelete(ingredientId)

    const formulaId = ingredient.formula;

    res.redirect(`/ingredients/add-ingredients/${formulaId}`)
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;