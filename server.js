const express = require('express');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const path = require('path');
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

// to encode req and can catch it! (previously uses body-Parser)
app.use(express.urlencoded(
    { extended: false }
));
    
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
