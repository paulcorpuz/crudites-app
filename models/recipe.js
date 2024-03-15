const mongoose = require('mongoose');

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
    name: {
        type: String,
        // default: 'DEN'
    },
    cuisine: {
        type: String,  //TODO: because there is a ton of cuisine, think of the performers from Mongoose movies
    },
    meal: {
        type: String,
        enum: ['Breakfast/Brunch', 'Lunch', 'Appetizer/Snack', 'Dinner', 'Dessert', 'Drink',],
    },
    ingredients: {
        type: String,
        // default: 'DEN'
    },
    allergens: {
        type: String,
        enum: ['Milk', 'Eggs', 'Fish', 'Crustacean Shellfish', 'Tree Nuts', 'Peanuts', 'Wheat', 'Soya',],
    },
    directions: {
        type: [String],
        required: true,
    },
    reviews: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true
});





// Compile the schema into a model and export it
module.exports = mongoose.model('Recipe', recipeSchema);




/* TODO: research on allergens
https://farrp.unl.edu/informallbig8


*/