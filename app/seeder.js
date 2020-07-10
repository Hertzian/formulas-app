const fs = require('fs')
const Sequelize = require('sequelize')
// const db = require('./config/db')
const dotenv = require('dotenv')

// load env vars
dotenv.config({path: './config/config.env'})

const conn = new Sequelize('formulas','root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT
}); 

// load models
const Formula = require('./models/formula')
const Ingredient = require('./models/ingredient')

// read JSON files
const formulas = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/formulas.json`, 'utf-8')
);
const ingredients = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/ingredient.json`, 'utf-8')
);

// import data to db
const importData = () => {
    try {
        formulas.forEach(formula => {
            Formula.create({
                id: formula.id,
                name: formula.name,
                unit: formula.unit
            })
        });

        ingredients.forEach(ingredient => {
            Ingredient.create({
                id: ingredient.id,
                name: ingredient.name,
                unit: ingredient.unit,
                formulaId: ingredient.formulaId
            })
        });
    
        
    
        console.log('Todo salio cheveres')
    } catch (err) {
        console.log('Bailo berta :(')
    }
    // console.log(formulas)
    // console.log(ingredients)
}

// delete data to db
const deleteData = () => {

}

// to pass args to this funcs, to know if import or delete
// example in console:
// node seeder -i
if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2] === '-d'){
    deleteData();
}
