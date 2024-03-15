var express = require('express');
var router = express.Router();
const recipeCtrl = require('../controllers/recipes');

// all paths start with /recipes



// GET /recipes index
router.get('/', recipeCtrl.index)

// GET /recipes/:id
router.get('/:id', recipeCtrl.show)







module.exports = router;
