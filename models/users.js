const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const User = new Schema({
    name: {
        firstname: String,
        lastname: String
    },
    username: String,
    password: String,
    memberStatus: Boolean,
    Admin: Boolean
});

User.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(this.password, salt);
        this.password = hashPass;
        next();
    }
    catch(err){
        next(err);
    }
});

module.exports = mongoose.model('user', User);