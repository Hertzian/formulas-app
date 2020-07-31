const express = require('express');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const path = require('path');
const flash = require('express-flash');
dotenv.config({path: './config/config.env'});
const errorRoutes = require('./routes/error');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

// connect to DB
connectDB();

const app = express();

// passport config
require('./config/passportConfig')(passport);

// Handlebars
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// flash
app.use(flash())

// Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

// to encode req and can catch it! (previously uses body-Parser)
app.use(express.urlencoded(
    { extended: false }
));

// ***********************************************
// Route that creates a flash message using the express-flash module
app.all('/express-flash', function( req, res ) {
    req.flash('success', 'This is a flash message using the express-flash module.');
    res.redirect(301, '/');
});

// Route that creates a flash message using custom middleware
app.all('/session-flash', function( req, res ) {
    req.session.sessionFlash = {
        type: 'success',
        message: 'This is a flash message using custom middleware and express-session.'
    }
    res.redirect(301, '/');
});
// ***********************************************


    
// init routes
const authRoutes = require('./routes/auth')
const formulaRoutes = require('./routes/formulas')
const ingredientRoutes = require('./routes/ingredients')

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', authRoutes);
app.use('/formulas/', formulaRoutes);
app.use('/ingredients/', ingredientRoutes);
app.use(errorRoutes.get404);

app.listen(
    process.env.PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
);
