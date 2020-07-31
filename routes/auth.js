const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const {checkAuth, checkYesAuth} = require('../middlewares/auth')
const User = require('../models/user')

// @dec     login view
// @route   GET /login
// @access  Public
router.get('/', checkYesAuth, (req, res, next ) => res.render('auth/login'));

// @dec     login process
// @route   POST /login
// @access  Public
router.post('/login', checkYesAuth, (req, res, next ) => {
  passport.authenticate('local', {
    successRedirect: '/formulas',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next)
});

// @dec     register view
// @route   GET /register
// @access  Public
router.get('/register', checkYesAuth, (req, res, next) => res.render('auth/register'))

// @dec     register view
// @route   POST /register
// @access  Public
router.post('/register', checkYesAuth, async (req, res, next) => {
  const {name, email, password, passwordConfirm} = req.body;
  let errors = [];

  if(!name || !email || !password || !passwordConfirm){
    errors.push({msg: 'Completa todos los campos.'})
  }
  
  if(password.length < 6){
    errors.push({msg: 'La contraseña debe ser mayor a 6 caracteres.'})
  }

  if(password != passwordConfirm){
    errors.push({msg: 'Las contraseñas son diferentes.'})
  }
  
  if(errors.length > 0){
    res.render('auth/register', {errors, name, email, password, passwordConfirm})
  }

  try {
    if(await User.findOne({email: email})){
      errors.push({msg: 'Ya está registrado ese email.'})

      res.render('auth/register', {errors, name, email, password, passwordConfirm})
    }
    else{
      await User.create({
        name: name,
        email: email,
        password: await bcrypt.hash(password, 10)
      })
      
      res.redirect('/')
    }
    
  } catch (err) {
    console.log(err)        
  }
})

// @dec     logout
// @route   GET /logout
// @access  Private
router.post('/logout', checkAuth, (req, res, next) => {
  console.log(req.logout())
  req.logout();
  console.log('sesion closed!')
  // req.flash('success_msg', 'Cerraste sessión')
  res.redirect('/')
})

module.exports = router