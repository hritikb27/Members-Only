const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        firstname: String,
        lastname: String
    },
    username: String,
    password: String,
    memberStatus: Boolean
});

module.exports = mongoose.model('user', User);