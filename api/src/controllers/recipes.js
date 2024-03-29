require("dotenv").config();
const axios = require("axios");
const { apiKey } = process.env;
const { Recipe, Diets } = require("../db.js");

function getRecipes(req, res, next) {
  const nameQuery = req.query.name;
  var apiRecipes = [];
  var dbRecipes = [];
  if (nameQuery) {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`
      )
      .then((apiResponse) => {
        apiRecipes = apiResponse.data.results.filter((recipe) => {
          return recipe.title.toLowerCase().includes(nameQuery.toLowerCase());
        });
        return Recipe.findAll({ include: [Diets] });
      })
      .then((dbResponse) => {
        dbRecipes = dbResponse.filter((recipe) => {
          return recipe.title.toLowerCase().includes(nameQuery.toLowerCase());
        });
        if (!apiRecipes.length && !dbRecipes.length)
          return res.status(404).send("recipe not found");
        return res.status(200).json([...dbRecipes, ...apiRecipes]);
      })
      .catch((error) => next(error));
  } else {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`
      )
      .then((apiResponse) => {
        apiRecipes = apiResponse.data.results;
        return Recipe.findAll({ include: [Diets] });
      })
      .then((dbResponse) => {
        return res.status(200).json([...dbResponse, ...apiRecipes]);
      })
      .catch((error) => next(error));
  }
}

function getRecipesDb(req, res, next) {
  apiRecipes = [];
  const queryType = req.query.type;
  if (queryType === "created") {
    Recipe.findAll({ include: [Diets] })
      .then((dbResponse) => {
        return res.status(200).json(dbResponse);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } else {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`
      )
      .then((apiResponse) => {
        apiRecipes = apiResponse.data.results;
        return res.status(200).json(apiRecipes);
      })
      .catch((error) => next(error));
  }
}
async function createRecipe(req, res) {
  const { title, summary, healthScore, analyzedInstructions, diets, image } = req.body;
  if (!title || !summary || !diets) return res.status(404).send("MISSING TITLE, DIETS OR SUMMARY");

  try {
    let createdRecipe = await Recipe.create({
      title: title,
      image: image || "",
      summary: summary,
      healthScore: healthScore,
      analyzedInstructions: analyzedInstructions || "",
    });
    let dietInDb = await Diets.findAll({
      where: {
        name: diets,
      },
    });

    createdRecipe.addDiets(dietInDb);

    return res.status(201).json({
      message: "Recipe created successfully",
    });
  } catch (error) {
    res.status(404).send(error);
  }
}

function getRecipeById(req, res, next) {
  const id = req.params.idReceta;
  if (id.includes("-")) {
    Recipe.findByPk(id, { include: Diets }).then((response) => {
      return res.json(response);
    });
  } else {
    axios
      .get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
      .then((response) => {
        return res.json({
          vegetarian: response.data.vegetarian,
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
  getRecipeById,
  getRecipesDb,
};
