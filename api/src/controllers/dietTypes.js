require("dotenv").config();
const { Diets } = require("../db.js");
const axios = require("axios");
const { apiKey } = process.env;

let linkDiets = [         //tomadas del enlace que se pasa en el readme y no vienen de la API
	{name:'vegetarian'},
	{name:'lacto vegetarian'},
	{name:'ovo vegetarian'},
	{name:'low FODMAP'}
]

async function getDiets(req, res, next) {

	try {
    let dietSearch = await Diets.findAll();
    if (dietSearch.length > 0) {
    return res.status(200).send('The diet-types table has been created');
} else {
    
let diets = []; //declaro un array vacio y hago la llamada a la api

let response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=300`
);

let arrayDiets = response.data.results.map((recipe) => {   //de cada receta tomo su arreglo de dietas
	return recipe.diets;  
});

arrayDiets.forEach((dietArray) => {         //por cada arreglo de dietas, las concateno
    diets = diets.concat(dietArray);
});

const dietArr = new Set(diets);             // con set elimino las repetidas

let apiDiets = [...dietArr].map((e) => {
    return { name: e };
  }); // arreglo final con las dietas filtradas de la API

let finalDiets = [...linkDiets, ... apiDiets]; //creo un arreglo con TODOS los tipos de dieta

    let dietCreate = await Diets.bulkCreate(finalDiets); //añado las dietas a la tabla
    return res.status(200).json(dietCreate);
    }
	} catch (error) {
    next(error);
	}
}

module.exports = {
getDiets,
};
