const mongoose = require('mongoose');

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;










// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);