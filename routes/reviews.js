const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
// const ensureLoggedIn = require('../config/ensureLoggedIn');


/* -- CREATE -- */
// POST /recipes/:id/reviews (create review for a movie)
router.post('/recipes/:id/reviews', reviewsCtrl.create);



// DELETE /reviews/id 
router.delete('/reviews/:id', reviewsCtrl.delete);


module.exports = router;