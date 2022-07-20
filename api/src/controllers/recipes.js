require("dotenv").config();
const axios = require('axios');
const { apiKey }  = process.env;
const { Recipe, DietTypes } = require('../db.js');
const { getDiets } = require('./dietTypes.js')


function getRecipes(req, res, next) {
	const nameQuery = req.query.name;
	var apiRecipes = [];
	var dbRecipes = [];
	if (nameQuery) {
		axios
			.get(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&name=${nameQuery}&number=100`
			)
			.then((apiResponse) => {
				apiRecipes = apiResponse.data.results.filter((recipe) => {
					return recipe.title.toLowerCase().includes(nameQuery.toLowerCase());
				});
				return Recipe.findAll({ include: [DietTypes] });
			})
			.then((dbResponse) => {
				dbRecipes = dbResponse.filter((recipe) => {
					return recipe.title.toLowerCase().includes(nameQuery.toLowerCase());
				});
				return res.status(200).json(
					[...dbRecipes, ...apiRecipes].slice(0, 9)
				);
			})
			.catch((error) => next(error));
	} else {
		axios
			.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
			.then((apiResponse) => {
				apiRecipes = apiResponse.data.results;
				return Recipe.findAll({ include: [DietTypes] });
			})
			.then((dbResponse) => {
				return res.status(200).json([...dbResponse, ...apiRecipes]);
			})
			.catch((error) => next(error));
	}
};

async function createRecipe(req, res) {
	const { title, summary, healthScore, analyzedInstructions, diets, image } = req.body;
	if(!title || !summary) return 'MISSING TITLE OR DESCRIPTION'
	try {
		let createdRecipe = await Recipe.create({
			title: title,
			image: image || '', 
			summary: summary,
			healthScore: healthScore,
			analyzedInstructions: analyzedInstructions || '',
			createdInDb: true
		})
			let dietInDb = await DietTypes.findAll({
				where: {
					name: diets
				},
			});

			createdRecipe.addDietTypes(dietInDb)

				return res.status(201).json({
					message: 'Recipe created successfully',
				});	
	} catch (error) {
	res.status(404).send(error);
	}
}

function getRecipeById(req, res, next) {
	const id = req.params.idReceta;
	if (id.includes('-')) {
		Recipe.findByPk(id, { include: DietTypes }).then((response) => {
			return res.json(response);
		});
	} else {
		axios
			.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
			.then((response) => {
				return res.json({
					title: response.data.title,
					image: response.data.image,
					dishTypes: response.data.dishTypes,
					diets: response.data.diets,
					summary: response.data.summary,
					healthScore: response.data.healthScore,
					analyzedInstructions: response.data.analyzedInstructions,
				});
			})
			.catch((error) => next(error));
	}
}






module.exports = {
    getRecipes,
	createRecipe,
	getRecipeById
}