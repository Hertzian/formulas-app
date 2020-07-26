const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/user')

// @dec     login view
// @route   GET /login
// @access  Public
router.get('/', (req, res, next ) => {
  res.render('auth/login');
})

// @dec     login process
// @route   POST /login
// @access  Public
router.post('/login', (req, res, next ) => {
  passport.authenticate('local', {
    successRedirect: '/formulas',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next)
});

// @dec     register view
// @route   GET /register
// @access  Public
router.get('/register', (req, res, next) => {
  res.render('auth/register')
})

// @dec     register view
// @route   POST /register
// @access  Public
router.post('/register', (req, res, next) => {
  console.log(req.body)
  console.log('registered!!!')
})

// @dec     logout
// @route   GET /logout
// @access  Private
router.get('/logout', (req, res, next) => {
  req.logout();
  // req.flash('success_msg', 'Cerraste sessión')
  res.redirect('/')
})

module.exports = router