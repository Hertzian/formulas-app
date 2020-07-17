const express = require('express');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const path = require('path');
dotenv.config({path: './config/config.env'});
const errorRoutes = require('./routes/error');
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


// to encode req and can catch it! (previously uses body-Parser)
app.use(express.urlencoded(
    { extended: false }
    ));
    
// init routes
const formulaRoutes = require('./routes/formulas')

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index');
});

// Routes
app.use('/formulas/', formulaRoutes);
app.use(errorRoutes.get404);

app.listen(
    process.env.PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
);
