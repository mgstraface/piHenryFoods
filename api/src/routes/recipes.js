const { Router } = require("express");
const router = Router();

const { getRecipes, createRecipe, getRecipeById, getRecipesDb } = require("../controllers/recipes");

router.get("/recipes", getRecipes);
router.get("/recipes/:idReceta", getRecipeById);
router.post("/recipe", createRecipe);
router.get("/recipesDb", this.getRecipesDb);

module.exports = router;
