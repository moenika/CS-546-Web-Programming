//IN ROUTES

const express = require("express");
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

//gettng the requested recipe

router.get("/:id", async (req, res) => {
    try {
        const post = recipesData.getRecipe(req.params.id);
        res.json(post);
    } catch(e) {
        res.status(404).json({error: "Recipe cannot be found!"});
    }
});

//gets all recipies

router.get("/", async (req, res) => {
    try {
        const post = recipesData.getAllRecipes();
        res.json(post);
    } catch(e) {
        res.status(500).json({error: e});
    }
});

//adds a new recipe

router.post("/", async (req, res) => {
    const recipePostData = req.body;
    try {
        const {title, ingredients, steps} = recipePostData;
        const newRecipe = await recipesData.addRecipe(title, ingredients, steps);
        res.json(newRecipe);
    } catch(e){
        res.status(500).json({error: e});
    }
});

//updates recipe with new info given

router.put("/:id", async (req, res) => {
    const updatedData = req.body;
    try {
        await recipesData.getRecipe(req.params.id);
    } catch(e) {
        res.status(404).json({ error: "Post not found"});
    }

    try {
        const updatedRecipe = await postData.updateRecipe(req.params.id);
        res.json(updatedRecipe);
    } catch (e) {
        res.status(500).json({ error: e});
    }
});

//deletes the recipe

router.delete("/:id", async (req, res) => {

    try {
        await recipesData.getRecipe(req.params.id);
    } catch (e) {
        res.status(404).json({error: "Can't find recipe"});
    }

    try {
        await recipesData.deleteRecipe(req.params.id);
    } catch (e) {
        res.status(500).json({error: e});
    }
});


module.exports = router;