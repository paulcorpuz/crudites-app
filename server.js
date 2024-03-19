var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // OAuth
var passport = require('passport'); // OAuth
var methodOverride = require('method-override');

require('dotenv').config();
require('./config/database'); // connect to the database AFTER the config vars are processed
require('./config/passport');


/* ----- TODO: ROUTERS ----- */
var indexRouter = require('./routes/index');
var recipesRouter = require('./routes/recipes');
var reviewsRouter = require('./routes/reviews');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* ----- MIDDLEWARE ----- */ //express app.use() method mount MIDDLEWARE into its MIDDLEWARE pipeline */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


/* ----- OAUTH MIDDLEWARE ----- */
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});


/* ----- TODO: ROUTERS ----- */ // the first arg is the "starts with" path. The paths within the route modules are appended to the starts with paths
app.use('/', indexRouter);
app.use('/recipes', recipesRouter);
app.use('/', reviewsRouter);











// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
