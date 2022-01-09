const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcrypt");

passport.use(
	new LocalStrategy(function (username, password, done) {
		User.findOne({ username }, async function (err, user) {
			try {
				if (err) return done(err);

				if (!user) return done(null, false, { message: "Incorrect username." });

				const checkPass = await bcrypt.compare(password, user.password);
				if (!checkPass)
					return done(null, false, { message: "Incorrect password." });

				if (user) return done(null, user);
				
			} catch (err) {
				console.log(err);
			}
		});
	})
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});
