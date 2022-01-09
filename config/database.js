const mongoose = require("mongoose");

require('dotenv').config();
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, function(err){
    if(err) console.log(err)
    
    else{
    console.log("connected to db...")
    }
});