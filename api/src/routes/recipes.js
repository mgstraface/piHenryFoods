const { Router } = require('express');
const router = Router();

const { getRecipes, createRecipe, getRecipeById } = require('../controllers/recipes');

router.get('/recipes', getRecipes);
router.get('/recipes/:idReceta', getRecipeById);
router.post('/recipe', createRecipe);

module.exports = router;