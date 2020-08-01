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

// global vars
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.danger = req.flash('danger')
    res.locals.error = req.flash('error')
    // res.locals.sessionFlash = req.session.sessionFlash;
    // delete req.session.sessionFlash;

    next();
});

// to encode req and can catch it! (previously uses body-Parser)
app.use(express.urlencoded(
    { extended: false }
));

// ***********************************************
// Route that creates a flash message using the express-flash module
// app.all('/express-flash', function( req, res ) {
//     req.flash('success', 'This is a flash message using the express-flash module.');
//     res.redirect('/');
// });

// Route that creates a flash message using custom middleware
// app.all('/session-flash', function( req, res ) {
//     req.session.sessionFlash = {
//         type: 'success',
//         message: 'This is a flash message using custom middleware and express-session.'
//     }
//     res.redirect('/');
// });

// Route that incorporates flash messages from either req.flash(type) or res.locals.flash
// app.get('/', function( req, res ) {
//     res.render('index', { expressFlash: req.flash('success'), sessionFlash: res.locals.sessionFlash });
// });
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
