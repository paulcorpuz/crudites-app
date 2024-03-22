const Recipe = require('../models/recipe');
// const ensureLoggedIn = require('../config/ensureLoggedIn');
// Recipe requires the recipe model (folder) ^^


// exports an object with fncs that can be imported and used
module.exports = {
    index,
    userIndex,
    aboutIndex,
    // rootIndex, removed, out of time
    show,
    new: newRecipe,
    create,
    edit,
    update,
    addToIngredients,
    addToInstructions,
    delete: deleteRecipe,
};

/* -- CREATE -- */
// initializes new recipe
function newRecipe(req, res) {
    const newRecipe = new Recipe();
    res.render('recipes/new', {
        errorMsg: ''
    });
}
//  create new recipe, extracts data from the request body 
async function create(req, res) {
    try {
        const { name, ingredients, instructions, cookingTime, category, imageUrl, description, } = req.body;
        // OAuth -- Add the user-centric info to req.body (the new recipe) user info add it to req.body
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        //for a user to input more than one ingredient at a time, take string, delimits, split() ; maps over array, trim()
        const ingredientsArray = ingredients.split(';').map(function (ingredient) {
            return ingredient.trim();
        });
        const instructionsArray = instructions.split(';').map(function (instruction) {
            return instruction.trim();
        });
        // creates new entries in the recipe based off the below:
        await Recipe.create({
            name,
            ingredients: ingredientsArray,
            instructions: instructionsArray,
            cookingTime,
            category,
            imageUrl,
            user: req.body.user,
            userName: req.body.userName,
            userAvatar: req.body.userAvatar,
            description,
        });
        res.redirect('/recipes/');
    } catch (err) {
        console.log(err);
        res.render('recipes/new', { errorMsg: err.message });
    }
}

/* -- READ -- */
// fetches all recipes from mongo, sorts by updatedAt, then renders
async function index(req, res) {
    const recipes = await Recipe.find({}).sort({"updatedAt": -1})
    res.render('recipes/index', { recipes });
}
// show renders specific recipe from mongo based on the req.params.id, aka the ID from the URL route (unique identifier) 
async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/show', {
        title: 'Recipe Detail',
        recipe,
    })
}

async function userIndex(req, res) {
    const recipes = await Recipe.find({}).sort({"createdAt": -1})
    res.render('recipes/userIndex', { recipes });
}
async function aboutIndex(req, res) {
    const recipes = await Recipe.find({}).sort({"updatedAt": -1})
    res.render('recipes/about', { recipes });
}


// removed, out out time
// async function rootIndex(req, res) {
//     const recipes = await Recipe.find({}).sort({"updatedAt": -1})
//     res.render('/index', { recipes });
// }


/* -- UPDATE -- */
// fnc finds specific recipe from mongo based of :id and enders it on recipe/edit
async function edit(req, res) {
    const recipe = await Recipe.findById(req.params.id) //object
    res.render('recipes/edit', {  //what ejs page it's going to
        recipe,
    })
}
async function update(req, res) {
    try {
        const recipe = await Recipe.findById(req.params.id); // Find the recipe by id
        const { name, ingredients, instructions, cookingTime, category, imageUrl, description } = req.body;
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
        recipe.description = description;
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
//AAU idea, updating ingredients and/or instructions separately, push())
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
// deletes the ENTIRE recipe from the Database by finding the ID (the unique req.params) and.. poof
async function deleteRecipe(req, res) {
    await Recipe.findByIdAndDelete(req.params.id)
    res.redirect(`/recipes/userIndex`); // Redirect back to the recipe's show view
}

