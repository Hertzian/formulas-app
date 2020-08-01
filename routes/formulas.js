const express = require('express');
const Formula = require('../models/formula');
const Ingredient = require('../models/ingredient');
const {checkAuth} = require('../middlewares/auth')
const router = express.Router();

// @dec     get all formulas
// @route   /formulas
// @access  Private
router.get('/', checkAuth, async (req, res, next) => {
  try {
    let formulas = await Formula.find().lean();
    
    res.render('formulas', {
      formulas
    });
  } catch (err) {
    console.log(err)
    req.flash('danger', 'Ha ocurrido un error')
    res.redirect('/formulas')
  }
});

// @dec     Display Create formula view
// @route   GET /formulas/create
// @access  Private
router.get('/add', checkAuth, (req, res, next) => {
  res.render('addFormula');
})

// @dec     Create formula
// @route   POST /formulas/create
// @access  Private
router.post('/add', checkAuth, async (req, res, next) => {
  try {
    await Formula.create({
      name: req.body.name,
      unit: req.body.unit
    })

    req.flash('success', 'Se agregó tu fórmula')
    res.redirect('/formulas')
  } catch (err) {
    console.log(err)
    req.flash('danger', 'Ha ocurrido un error')
    res.redirect('/formulas')
  }
});

// @dec     Delete formula
// @route   POST /formulas/delete/:formulaId
// @access  Private
router.post('/delete/:formulaId', checkAuth, async (req, res, next) => {
    try {
      const formulaId = req.params.formulaId
      await Formula.findByIdAndDelete(formulaId)

      req.flash('danger', 'Se eliminó tu fórmula')
      res.redirect('/formulas')
    } catch (err) {
      console.log(err)
      req.flash('danger', 'Ha ocurrido un error')
      res.redirect('/formulas')
    }
})

module.exports = router;
