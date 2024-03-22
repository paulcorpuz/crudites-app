const Recipe = require('../models/recipe');
// Recipe requires the recipe model (folder)


module.exports = {
    create,
    delete: deleteReview,
};

/* -- CREATE -- */
async function create(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    // OAuth -- Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    recipe.reviews.push(req.body);
    try {
        await recipe.save();
    } catch (err) {
        console.log(err);
    }
    // Respond to the Request (redirect if data has been changed)
    res.redirect(`/recipes/${recipe._id}`);
}

/* -- DELETE -- */
// removes the specified review from the recipe's reviews array, moongoose method
async function deleteReview(req, res) {
    const recipe = await Recipe.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id }); //OAuth
    if (!recipe) return res.redirect('/recipes');
    // Remove the review using the remove method available on Mongoose arrays
    recipe.reviews.remove(req.params.id);
    // Save the updated recipe doc
    await recipe.save();
    // Redirect back to the recipe's show view
    res.redirect(`/recipes/${recipe._id}`);
}

