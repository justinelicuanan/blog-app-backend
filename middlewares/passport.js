const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Create local strategy
const localStrategy = new LocalStrategy(async (username, password, done) => {
	try {
		const user = await User.findOne({ username });
		if (!user)
			return done(null, false, {
				err: true,
				message: 'Username is incorrect',
			});
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return done(null, false, {
				err: true,
				message: 'Password is incorrect',
			});
		done(null, user);
	} catch (err) {
		done(err);
	}
});

// Use local strategy
passport.use(localStrategy);

// Serialize user
passport.serializeUser((user, done) => {
	done(null, user._id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

module.exports = passport;
