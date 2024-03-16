const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const recipeSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        ingredients:[{
            type: String,
            required: true,
        }],
        instructions:{
            type: String,
            required: true,
        },
        cookingTime:{
            type: Number,
            required: true,
        },
        meal: {
            type: String,
            enum: ['Appetizer/Snack','Breakfast/Brunch','Lunch','Dinner','Dessert','Drink',],
        },
        imageUrl:{
            type: String,
        },
        reviews: [reviewSchema],
        }, {
    timestamps: true
});







    // Compile the schema into a model and export it
    module.exports = mongoose.model('Recipe', recipeSchema);



/* TODO: research on allergens
https://farrp.unl.edu/informallbig8
*/