import {RecipeService} from "../models/recipes.js"
const rs = new RecipeService();

class RecipeController
{
    //Handles logic for recipe-related activities in the database
    async createRecipe(req, res)
    {
        try
        {
            const {name, image, description} = req.body;
            const newRecipe = await rs.createRecipe(name, image, description);
            res.status(200).send(newRecipe);
        }
        catch(err)
        {
            res.status(400).send(err);
        }
    }

    async getRecipeByID(req, res)
    {
        const {id} = req.body;
        const recipe = await rs.getRecipeByID(id);

        if(recipe != null)
            res.status(200).send(recipe);
        else
            res.status(400).send('Recipe not found');
    }

    async getRecipeByName(req, res)
    {
        const {name} = req.body;
        const recipe  = await rs.getRecipeByName(name)
        
        if(recipe != null)
            res.status(200).send(recipe);
        else
            res.status(400).send('Recipe not found');
    }

    async updateRecipe(req, res)
    {
        try
        {
            const {id, name, image, description} = req.body;
            const recipe = await rs.updateRecipe(id, name, image, description);
            res.status(200).send(recipe);
        }
        catch(err)
        {
            res.status(400).send(err);
        }
    }
}

export default RecipeController;