const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')

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
  console.log(req.body)

  // res.render('auth/login');
})

// @dec     register view
// @route   GET /register
// @access  Public
router.get('/register', (req, res, next) => {
  res.render('auth/register')
})

module.exports = router