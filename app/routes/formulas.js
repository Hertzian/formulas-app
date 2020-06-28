const express = require('express');
const router = express.Router();
const Formula = require('../models/Formula');

router.get('/', (req, res, next) => {
    Formula.findAll()
        .then(formulas => {
            // console.log(formulas);
            res.sendStatus(200);
        })
        .catch(err => console.error(err.message))
});

module.exports = router;