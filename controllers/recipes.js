const Recipe = require('../models/recipe');
// const ensureLoggedIn = require('../config/ensureLoggedIn');


module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    edit,
    update,
    addToIngredients,
    addToInstructions,
};


/* -- CREATE -- */
function newRecipe(req, res) {
    const newRecipe = new Recipe();
    res.render('recipes/new', {
        errorMsg: ''
    });
}
async function create(req, res) {
    try {
        const { name, ingredients, instructions, cookingTime, category, imageUrl } = req.body;
        const ingredientsArray = ingredients.split(';').map(function (ingredient) {
            return ingredient.trim();
        });
        const instructionsArray = instructions.split(';').map(function (instruction) {
            return instruction.trim();
        });
        await Recipe.create({
            name,
            ingredients: ingredientsArray,
            instructions: instructionsArray,
            cookingTime,
            category,
            imageUrl
        });
        res.redirect('/recipes/');
    } catch (err) {
        console.log(err);
        res.render('recipes/new', { errorMsg: err.message });
    }
}

/* -- READ -- */
async function index(req, res) {
    const recipes = await Recipe.find({})
    res.render('recipes/index', { recipes });
}
async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/show', {
        title: 'Recipe Detail',
        recipe,
    })
}


/* -- UPDATE -- */
async function edit(req, res) {
    const recipe = await Recipe.findById(req.params.id) //object
    res.render('recipes/edit', {  //what ejs page to 
        recipe,
    })
}
async function update(req, res) {
    try {
        const recipe = await Recipe.findById(req.params.id); // Find the recipe by id
        const { name, ingredients, instructions, cookingTime, category, imageUrl } = req.body;
        // handle ingredients and instructions like the create function 
        const ingredientsArray = ingredients.split(';').map(function (ingredient) {
            return ingredient.trim();
        });
        const instructionsArray = instructions.split(';').map(function (instruction) {
            return instruction.trim();
        });
        // Update recipe properties
        recipe.name = name;
        recipe.ingredients = ingredientsArray;
        recipe.instructions = instructionsArray;
        recipe.cookingTime = cookingTime;
        recipe.category = category;
        recipe.imageUrl = imageUrl;
        // Save NOT create
        await recipe.save();
        // Redirect to the updated recipe's page
        res.redirect(`/recipes/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.render('recipes/edit', { errorMsg: err.message });
    }
}

/* -- UPDATE's friends -- */
async function addToIngredients(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    const ingredient = req.body.ingredients;
    recipe.ingredients.push(ingredient);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
}

async function addToInstructions(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    const instruction = req.body.instructions;
    recipe.instructions.push(instruction);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}/edit`);
}




/* -- DELETE -- */
// TODO: add?






// https://www.codementor.io/@prasadsaya/working-with-arrays-in-mongodb-16s303gkd3
// https://www.mongodb.com/docs/manual/tutorial/update-documents/
// Recipe.findOneAndUpdate
// Recipe.findByIdAndUpdate

// pass req.body
// put

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_a_function