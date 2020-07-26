const express = require('express');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const path = require('path');
dotenv.config({path: './config/config.env'});
const errorRoutes = require('./routes/error');
const session = require('express-session');
const connectDB = require('./config/db');

// connect to DB
connectDB();

const app = express();

// Handlebars
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// to encode req and can catch it! (previously uses body-Parser)
app.use(express.urlencoded(
    { extended: false }
));
    
// init routes
const formulaRoutes = require('./routes/formulas')
const ingredientRoutes = require('./routes/ingredients')

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index');
});

// Routes
app.use('/formulas/', formulaRoutes);
app.use('/ingredients/', ingredientRoutes);
app.use(errorRoutes.get404);

app.listen(
    process.env.PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
);
