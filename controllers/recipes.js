const Recipe = require('../controllers/recipes');
// const ensureLoggedIn = require('../config/ensureLoggedIn');


module.exports = {
    index,
    show,
    new: newRecipe,
    create,

};

function index(req, res) {
    res.render("recipes/index", { });
}

function show(req, res) {
    res.render("recipes/show", { });
}


//paired controller actions for adding movie 
function newRecipe(req, res) {
    res.render('recipes/new', { errorMsg: '' });
}



function create(req, res) {
    res.render("recipes/new", { });
}