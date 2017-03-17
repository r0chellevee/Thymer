var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    time: Number,
    ingredients: Array,
    steps: Array,
    title: String,
    author: String,
    cuisine: String,
    diet: String,
    image: String,
    description: String //personal story about the recipe
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;