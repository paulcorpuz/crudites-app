var express = require('express');
var router = express.Router();
const recipesCtrl = require('../controllers/recipes');

// actual path based off server.js is /recipes
// all paths start with /recipes
//these are combined with server


// GET /recipes index
router.get('/', recipesCtrl.index)

// GET /recipes/:id
router.get('/:id', recipesCtrl.show)



// adding in a new recipe
// GET /recipes/new
router.get('/new', recipesCtrl.new);








module.exports = router;




// https://gist.github.com/jim-clark/17908763db7bd3c403e6 