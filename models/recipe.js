const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userName: String,
    userAvatar: String,
}, {
    timestamps: true
});
// TODO: rating? ^^ update after OAuth 


const recipeSchema = new Schema({
    name: {
        type: String,
    },
    ingredients: [{
        type: String,
    }],
    instructions: [{
        type: String,
    }],
    cookingTime: {
        type: Number,
        min: 0,
        max: 9999,
    },
    category: {
        type: String,
        enum: ['Appetizer', 'Dessert', 'Drinks', 'Entree', 'Other', 'Side Dish'],
        default: 'Entree',
    },
    imageUrl: {
        type: String,
    },
    reviews: [reviewSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userName: String,
    userAvatar: String,
}, {
    timestamps: true
});


// -- need OAuth, add in user, recipes by user .find, recipe.user.id = ~
// TODO: Aad user to recipe into 


// Compile the schema into a model and export it
module.exports = mongoose.model('Recipe', recipeSchema);










/* TODO:
in mongo, this is what is looks like:

_id
name
ingredients
instructions
cookingTime
category
imageUrl
reviews:
users: --- added 03/18 ---
createdAt ---use this ---
updatedAt ---use this --- 

*/