const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuidV4 = require("uuid/v4");

let exportedMethods = {
    //gets the existing recipe
    async getRecipe(id) {
        if(!id) throw "Please enter a valid ID.";
        const recipeCollection = await recipes();
        const recipe = await recipeCollection.findOne({_id: id});

        if(!recipe) throw "Can't find recipe.";
        return recipe;
    },

    //gets all recipes
    async getAllRecipes() {
        const recipeCollection = await recipes();
        return await recipeCollection.find({}).toArray();
    },
    
    //adds new recipe
    async addRecipe(title, steps, ingredients) {
        if(!title) throw "Name the recipe";
        if(!steps) throw "Give steps for the recipe";
        if(!ingredients) throw "Name the ingredients";
        
        const recipeCollection = await recipes();
        const newRecipe = {
            _id: uuidV4(),
            title: title,
            ingredients: ingredients,
            steps: steps,
            comments: []
        };
        const newInsertInformation = await recipeCollection.insertOne(newRecipe);
        const newId = newInsertInformation.insertedId;
        const me = await this.getRecipe(newId);
        return me
    },

    //updates the recipe
    async updateRecipe(id, updatedRecipe) {
        if(id === undefined) throw "enter an ID";
        const recipeCollection = await recipes();
        let updatedRecipeData = {};

        if (updatedRecipe.title) {
            updatedRecipeData.title = updatedRecipe.title;
        }

        if (updatedRecipe.ingredients && (updatedRecipe.ingredients.name) && updatedRecipe.ingredients.amount) {
            updatedRecipeData.ingredients = updatedRecipe.ingredients;
        }

        if (updatedRecipe.steps && Array.isArray(updatedRecipe.steps)) {
            updatedRecipeData.steps = updatedRecipe.steps;
        }

        let updateCommand = {
            $set: updatedRecipeData
        };

        const query = {
            _id: id
        };

        await recipeCollection.updateOne(query, updateCommand);
        return await this.getRecipe(id);
    },

   //deletes a recipe

   async deleteRecipe(id) {
       if(id === undefined) throw "Enter an id";
       const recipeCollection = await recipes();
       const deletionInfo = await recipeCollection.removeOne({_id: id});
      
       if(deletionInfo.deletedCount === 0) {
           throw ("Couldn't delete id");
       }
},

   //adds a comment to the recipe
   async addComment(id, poster, comment) {
       if(!id === undefined) throw "Please provide an id for the recipe";
       if(typeof poster !== string) throw "Please provide your name";
       if(typeof comment !== string) throw "Please provide a comment";

       const recipeCollection = await recipes();

       const newComment = {
           _id: uuidV4,
           poster: poster,
           comment: comment
       }
       let updateCommand = {
           $set: {comment: newComment}
       };

       const query = {
           _id: recipeId
       };

       await recipeCollection.updateOne(query, updateCommand);
       return await this.getRecipe(id);
   },

    //gets the comment

    async getComment(recipeId, commentId) {
        if(recipeId === undefined || commentId === undefined) throw "Need ids";
        const recipeCollection = await recipes();
        const recipe = await recipeCollection.findOne({_id: recipeId});
        const comment = await recipe.comments.findOne({_id: commentId});

        if (recipe === undefined) throw "Can't find recipe";
        if (comment === undefined) throw "Can't find comment";

        return comment;
    },


    async deleteComment(id) {
        const recipeCollection = await recipes();
        const deletionInfo = await recipeCollection.removeOne({_id: id});
    
        if(deletionInfo.deletedCount === 0) {
            throw "Couldn't delete id";
        }
    },

    //updates the comment
    async updateComment(recipeId, commentId, updateComment) {
        if(recipeId === undefined) throw "Provide an id";
        if(commentId === undefined) throw "Provide a comment id";
        if(updatedComment === undefined) throw "Provide a new comment";

        const recipeCollection = await recipes();

        const recipe = await recipeCollection.findOne({_id: recipeId});
        if(comment === undefined) throw "Recipe not found";

        if(updatedComment.poster) {
            updatedCommentData["comments.$.poster"] = updatedComment.poster;
        }
        if (updatedComment.comment)
        updatedCommentData["comments.$.comment"] = updatedComment.comment;

        let updateCommand = {
            $set: updatedCommentData
        };
        const query = {
            _id: commentId
        };

        await recipe.updateOne(query, updateCommand);
        return await this.getRecipe(recipeId);
    },

   //gets the comments for the recipe
   async getAllComment(recipeId) {
    if(recipeId === undefined) throw "Provide id";
    const recipeCollection = await recipes();
    const recipe = await recipeCollection.findOne({_id: recipeId});

    if (!recipe) throw "Can't find recipe";

    return recipe;
   },
};

module.exports = exportedMethods;