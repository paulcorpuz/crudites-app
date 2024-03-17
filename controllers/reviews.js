const Recipe = require('../models/recipe');

module.exports = {
    create,
    delete: deleteReview,
};

async function create(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    // req.body.user = req.user._id;
    // req.body.userName = req.user.name;
    // req.body.userAvatar = req.user.avatar;
    // recipe.reviews.push(req.body);
    try {
        await recipe.save();
        res.render('recipeDetail', { recipe: recipe });
    } catch (err) {
        console.log(err);
    }
    // Step 5:  Respond to the Request (redirect if data has been changed)
    res.redirect(`/recipes/${recipe._id}`);
}

async function deleteReview(req, res) {
    const recipe = await Recipe.findOne({});
    // Rogue user!
    if (!recipe) return res.redirect('/recipes');
    // Remove the review using the remove method available on Mongoose arrays
    recipe.reviews.remove(req.params.id);
    // Save the updated recipe doc
    await recipe.save();
    // Redirect back to the recipe's show view
    res.redirect(`/recipes/${recipe._id}`);
}