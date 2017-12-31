const express = require("express");
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

//returns the comment
router.get("/recipe/:recipeId", async (req, res) => {
    try {
        const post = await recipesData.getAllComments(req.params.recipeId);
        res.json(post);
    } catch(e) {
        res.status(404).json({ error: "Can't find recipe."});
    }
});

//route returns the requested comment

router.get("/:commentId", async (req, res) => {
    try {
        const post = await recipesData.getComment(req.params.commentId);
        res.json(post);
    } catch (e) {
        res.status(404).json({error: "Can't find comment!"});
    }
});

//adds new comment to recipe

router.post("/:recipeId", async (req, res) => {
    const commentPostData = req.body;
    try {
        const{ _id, poster, comment} = commentPostData;
        const newComment = await recipesData.addComment(id, poster, comment);
        res.json(newPost);
    } catch (e) {
        res.status(404).json({error: "Comment not found"});
    }
});

//updates recipe

router.put("/:recipeId/:commentId", async (req, res) => {
    const updatedData = req.body;
    try {
        await recipesData.getRecipe(req.params.recipeId);
    } catch(e) {
        res.status(404).json({ error: "Post not found"});
    }

    try {
        const updateComment = await recipesData.getComment(req.params.commentId);;
        res.json(updateComment);
    } catch(e) {
        res.status(500).json({error: e});
    }
});


//deletes comment

router.delete("/:id", async (req, res) => {
    try {
        await recipesData.getComment(req.params.id);
    } catch(e) {
        res.status(404).json({error: "Post not found"});
    }
    try {
        await recipesData.deleteComment(req.params.id);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

module.exports = router;