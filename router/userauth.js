const express = require("express");
const Router = express.Router();
const { body, validationResult } = require("express-validator");
const req = require("express/lib/request");
const passport = require("passport");
const AuthCheck = require("../middlewares/AuthCheck");

const User = require("../models/users");

Router.get("/signup", (req, res) => {
	res.render("signup");
});

Router.post(
	"/signup",
	body(["firstname", "lastname"]).trim().escape(),
	body("username").isEmail().normalizeEmail(),
	body("password").isLength({ min: 5 }),
	body("confirmpw", "Confirm Password must match the password field")
		.exists()
		.custom((value, { req }) => value === req.body.password),
	(req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.json({ errors: error.array() })
        }
		const user = new User({
			name: {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
			},
			username: req.body.username,
			password: req.body.password,
			memberStatus: false,
		});

		user.save();
		res.redirect('/login')
	}
);

Router.get("/login", (req, res) => {
	res.render("login");
});

Router.post("/login", passport.authenticate("local",{failureRedirect: '/login'}), (req,res)=>{
	res.redirect("/");
});

Router.get("/becomemember", AuthCheck, (req,res)=>{
	res.render('BecomeMember');
});

Router.post("/becomemember", (req,res)=>{
	if(req.body.passcode=="AllowMe2"){
		User.findByIdAndUpdate(req.user._id, {memberStatus: true}, function(err, status){
			if(err){
				console.log(err)
			}
			else{
				res.send("Promoted!");
			}
		})

	}
	else{
		res.send("Not right passcode, try again!")
	}
});

module.exports = Router;
