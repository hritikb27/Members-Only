const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const db = require("./config/database");
require('dotenv').config();

const HomePage = require("./router/homepage");
const Posts = require("./router/Posts");
const UserAuth = require("./router/userauth");

const app = express();

db;

const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: "sessions"
});

app.set("view engine", "pug");
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: false,
}));

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', HomePage);
app.use('/posts', Posts);
app.use('/', UserAuth);

app.listen(8080);