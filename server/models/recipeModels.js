import {Database as db} from '../util/db.js';

export class RecipeService
{
    async getRecipeByName(name)
    {
        const rows = await db.query('SELECT * FROM recipe WHERE name = ?', [name]);
        if(rows.length < 1)
            return null;
        return rows;
    } 

    async getRecipeByID(id)
    {
        const rows = await db.query('SELECT * FROM Recipe WHERE id = ?', [id], (err, result) =>{
            if(err){
                console.log(err);
            }else{
                rows.send(result);
            }
        });
        // const rows = await db.query('SELECT FROM id, name, img, description FROM recipe WHERE id = ?', [id]);
        // if(rows.length !== 1)
        //     return null;
        // const recipe = rows[0];
        // return recipe;
    }

    async createRecipe(name, img, description)
    {
        await db.query('INSERT INTO recipe (name, img, description) VALUES (?, ?, ?)', [name, img, description]);
        const rows = await db.query('SELECT id, name, img, description FROM recipe WHERE name = ?', [name]);
        const recipe = rows[rows.length-1];
        return recipe;
    }

    async updateRecipe(id, name, img, description)
    {
        const rows = await db.query('SELECT FROM id, name, img, description WHERE id = ?', [id]);
        await db.query('UPDATE recipe SET (?, ?, ?) WHERE id = ?', [name, img, description, id]);
    }
}