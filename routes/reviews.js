const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');
// set up the necessary dependencies for defining routes + reqs

/* -- CREATE -- */
// POST /recipes/:id/reviews (create review for a movie)
router.post('/recipes/:id/reviews', ensureLoggedIn, reviewsCtrl.create);

// DELETE /reviews/id 
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);


module.exports = router;