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
        // required:true
    },
    userName: String,
    userAvatar: String,
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
        instructions:[{
            type: String,
            required: true,
        }],
        cookingTime:{
            type: Number,
            required: true,
            min: 0,
            max: 9999,
        },
        category: {
            type: String,
            enum: ['Appetizer', 'Dessert', 'Drinks', 'Entree','Other','Side Dish'],
            default: 'Entree',
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