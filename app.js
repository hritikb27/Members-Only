const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

const User = require("./models/users");
const Content = require("./models/content");

require('dotenv').config();
const db_URI = process.env.DB_URI;



app.listen(4000);