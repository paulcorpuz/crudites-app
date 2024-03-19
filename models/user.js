const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String,
}, {
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);



/*

in mongo, it looks like this

_id
name
googleId
email
avatar
createdAt ---use this ---
updatedAt ---use this ---

*/