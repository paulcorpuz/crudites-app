const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import mongoose library ^


const reviewSchema = new Schema({
    content: {
        type: String,
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


const recipeSchema = new Schema({
    name: {
        type: String,
    },
    description: {
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


module.exports = mongoose.model('Recipe', recipeSchema);









