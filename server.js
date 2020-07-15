const express = require('express');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const path = require('path');
dotenv.config({path: './config/config.env'});
const errorRoutes = require('./routes/error');
const sequelize = require('./config/db');

const app = express();

// models to relationship
const Formula = require('./models/formula');
const Ingredient = require('./models/ingredient');

// Handlebars
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

// init routes
const formulaRoutes = require('./routes/formulas')

// to encode req and can catch it! (previously uses body-Parser)
app.use(express.urlencoded(
    { extended: false }
));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index');
});

// Routes
app.use('/formulas/', formulaRoutes);
app.use(errorRoutes.get404);

// relationship
Ingredient.belongsTo(Formula, {
    constraints: true,
    onDelete: 'CASCADE'
});
Formula.hasMany(Ingredient);


sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        app.listen(
            process.env.PORT,
            console.log(`Server running on port ${process.env.PORT}`)
        );
    })
    .catch(err => console.log(err))
