var express = require('express');
var router = express.Router();
const recipesCtrl = require('../controllers/recipes');

// actual path based off server.js is /recipes
// all paths start with /recipes
//these are combined with server


/* -- CREATE -- */
// GET /recipes/new -- Add new recipe
router.get('/new', recipesCtrl.new);
// POST /flights
router.post('/', recipesCtrl.create)


/* -- READ -- */
// GET /recipes index
router.get('/', recipesCtrl.index)

// GET /recipes/:id
router.get('/:id', recipesCtrl.show)



/* -- UPDATE -- */
/* -- DELETE -- */






module.exports = router;




// https://gist.github.com/jim-clark/17908763db7bd3c403e6 