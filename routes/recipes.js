var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');
var ensureLoggedIn = require('../config/ensureLoggedIn');
// set up the necessary dependencies for defining routes + reqs

// actual path based off server.js is /recipes
// all paths start with /recipes (below are appended with the routers in server.js)


// GET /recipes index  -- READ -- all recipes
router.get('/', recipesCtrl.index)
// GET /recipes/userIndex
router.get('/userIndex', ensureLoggedIn, recipesCtrl.userIndex); 
// GET /recipes/aboutIndex
router.get('/about', recipesCtrl.aboutIndex);
// GET /recipes/userIndex
// router.get('/rootIndex', ensureLoggedIn, recipesCtrl.rootIndex); removed, 


// GET /recipes/new
router.get('/new', ensureLoggedIn, recipesCtrl.new); // new has to be before show route
// GET /recipes/:id -- READ --
router.get('/:id', recipesCtrl.show)
// GET edit a skill --> /skills/:id/edit
router.get('/:id/edit', ensureLoggedIn, recipesCtrl.edit);


// POST /recipe -- CREATE -- add new recipe
router.post('/', ensureLoggedIn, recipesCtrl.create)
// TODO: don't cross the streams
// POST /recipe -- CREATE? -- add ingredients
router.post('/:id/addIngredients', ensureLoggedIn, recipesCtrl.addToIngredients);
// POST /recipe -- CREATE? -- add instructions
router.post('/:id/addInstructions', ensureLoggedIn, recipesCtrl.addToInstructions);


// PUT /:id -- UPDATE -- edit recipe
router.put('/:id', ensureLoggedIn, recipesCtrl.update);


/* -- DELETE -- */
router.delete('/:id', recipesCtrl.delete);


module.exports = router;


// https://gist.github.com/jim-clark/17908763db7bd3c403e6 