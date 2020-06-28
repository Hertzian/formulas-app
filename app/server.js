const express = require('express');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const path = require('path');
dotenv.config({path: './config/config.env'});
const db = require('./config/db');

// // test db
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log(err));

const app = express();

// Handlebars
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.send('index');
});

// Routes
app.use('/formulas', require('./routes/formulas'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));