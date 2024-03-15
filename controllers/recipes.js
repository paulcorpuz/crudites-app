const Recipe = require('../controllers/recipes');

module.exports = {
    index,
    show,
};

function index(req, res) {
    res.render("recipes/index", {
    });
}

function show(req, res) {
    res.render("recipes/show", {
    });
}
