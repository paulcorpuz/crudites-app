var express = require('express');
var router = express.Router();
const passport = require('passport');
// const Recipe = require('../models/recipe');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/');
  });
});


// TODO: deleteALl clears all of data in recipeSchema
// router.get('/deleteAll', async function (req, res, next) {
//   await Recipe.deleteMany({})
//   res.redirect('/');
// });











module.exports = router;



/* -- CREATE -- */
/* -- READ -- */
/* -- UPDATE -- */
/* -- DELETE -- */