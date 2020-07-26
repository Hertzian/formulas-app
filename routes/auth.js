const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/user')

// @dec     login view
// @route   GET /login
// @access  Public
router.get('/', (req, res, next ) => res.render('auth/login'));

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
router.get('/register', (req, res, next) => res.render('auth/register'))

// @dec     register view
// @route   POST /register
// @access  Public
router.post('/register', async (req, res, next) => {
  console.log(req.body)

  try {
    const {name, email, password, passwordConfirm} = req.body;
    let errors = [];

    if(!name || !email || !password || !passwordConfirm){
      errors.push({msg: 'Completa todos los campos.'})
    }

    if(password != passwordConfirm){
      errors.push({msg: 'Las contraseñas son diferentes.'})
    }

    if(password.length < 6){
      errors.push({msg: 'La contraseña debe ser mayor a 6 caracteres.'})
    }

    if(errors.length > 0){
      res.render('auth/register', {errors, name, email, password, passwordConfirm})
    }else{
      const user = await User.findOne({email: email})

      if(user){
        errors.push({msg: 'Ya está registrado ese email.'})

        res.render('auth/register', {errors, name, email, password, passwordConfirm})
      }
      else{
        const hashedPass = await bcrypt.hash(password, 10)

        await User.create({
          name: name,
          email: email,
          password: hashedPass
        })
        
        res.redirect('/')
      }
    }
  } catch (err) {
    console.log(err)        
  }
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