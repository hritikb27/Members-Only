const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Content = new Schema({
    title: String,
    body: String
}, { timestamps: true } );

module.exports = mongoose.model('content', Content);