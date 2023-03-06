import express from 'express';
import RecipeController from '../controllers/recipes.js';

const router = express.Router();
const recipeController = new RecipeController();


router.post('/create', recipeController.createRecipe);

router.put('/update', recipeController.updateRecipe);

router.get('/recipes/name', recipeController.getRecipeByName);

router.get('/recipes/id', recipeController.getRecipeByID);

// Other user-related endpoints go here
// This file is essentially mapping URL routes to logic actions in the users controller

export default router;