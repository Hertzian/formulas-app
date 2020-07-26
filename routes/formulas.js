const express = require('express');
const Formula = require('../models/formula');
const Ingredient = require('../models/ingredient');
const router = express.Router();

// @dec     get all formulas
// @route   /formulas
// @access  Private
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
// @access  Private
router.get('/add', (req, res, next) => {
  res.render('addFormula');
})

// @dec     Create formula
// @route   POST /formulas/create
// @access  Private
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

// @dec     Delete formula
// @route   POST /formulas/delete/:formulaId
// @access  Private
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
