const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const app = express();

app.get('/', (req, res, next) => {
    res.send('index');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));