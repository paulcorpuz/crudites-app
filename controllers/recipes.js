const Recipe = require('../models/recipe');
// const ensureLoggedIn = require('../config/ensureLoggedIn');


module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    edit,
    update,
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
        await Recipe.create(req.body);
        // Always redirect after CUDing data
        // We'll refactor to redirect to the recipes index after we implement it
        res.redirect('/recipes/');
    } catch (err) {
        // Typically some sort of validation error
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
    console.log('---This is req.params.id: ' + req.params.id)
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
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_a_function


// https://www.mongodb.com/docs/manual/tutorial/update-documents/
async function update(req, res) {
    const recipe = await Recipe.update(req.params.id, req.body); //used when we made data
    res.redirect(`/recipes/${req.params.id}`, {
        recipe,
    });
}





/* -- DELETE -- */