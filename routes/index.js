var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');
const passport = require('passport');
// set up the necessary dependencies for defining routes + reqs

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route to render the page showing all recipes
router.get('/', recipesCtrl.index);

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


module.exports = router;

