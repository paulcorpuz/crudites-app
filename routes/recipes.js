var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');
// var ensureLoggedIn = require('../config/ensureLoggedIn');

// actual path based off server.js is /recipes
// all paths start with /recipes (below are appended with the routers in server.js)


// GET /recipes index  -- READ -- all recipes
router.get('/', recipesCtrl.index)
// GET /recipes/new
router.get('/new', recipesCtrl.new); // new has to be before show route
// GET /recipes/:id -- READ --
router.get('/:id', recipesCtrl.show)
// GET edit a skill --> /skills/:id/edit
router.get('/:id/edit', recipesCtrl.edit);


// POST /recipe -- CREATE -- add new recipe
router.post('/', recipesCtrl.create)
// POST /recipe -- CREATE? -- add ingredients
router.post('/:id/addIngredients', recipesCtrl.addToIngredients);
// POST /recipe -- CREATE? -- add instructions
router.post('/:id/addInstructions', recipesCtrl.addToInstructions);


// PUT /:id -- UPDATE -- edit recipe
router.put('/:id', recipesCtrl.update);



/* -- DELETE -- */
// router.delete('/:id', recipesCtrl.delete);





module.exports = router;




// https://gist.github.com/jim-clark/17908763db7bd3c403e6 