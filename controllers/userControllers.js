const passport = require('passport');
const User = require('../models/User');

// Register a user
const registerPost = async (req, res) => {
	const { name, email, username, password } = req.body;
	try {
		const user = await User.create({
			name,
			email,
			username,
			password,
		});
		req.login(user, (err) => {
			if (err) return next(err);
			res.status(201).json({
				success: true,
				message: 'User created successfully',
			});
		});
	} catch (error) {
		let err = {};
		if (error._message === 'user validation failed') {
			Object.keys(error.errors).forEach((errPath) => {
				err[errPath] = error.errors[errPath].message;
			});
			return res.status(400).json({ err });
		}
		if (error.code === 11000 && error.keyPattern.email) {
			err.email = 'Email is already registered';
			return res.status(400).json({ err });
		}
		if (error.code === 11000 && error.keyPattern.username) {
			err.username = 'Username is already registered';
			return res.status(400).json({ err });
		}
		res.status(400).json({ err: error });
	}
};

// Login to server
const loginPost = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(400).json(info);
		req.login(user, (error) => {
			if (error) return next(error);
			res.json({
				success: true,
				message: 'User logged in successfully',
			});
		});
	})(req, res, next);
};

// Logout to server
const logoutGet = (req, res) => {
	req.logout();
	res.json({
		success: true,
		message: 'User logged out successfully',
	});
};

// Get single user
const userGet = (req, res) => {};

// Get all users
const usersGet = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(400).json({ err });
	}
};

// Update a user
const updatePatch = (req, res) => {};

// Delete a user
const deleteDelete = async (req, res) => {
	try {
		const user = await User.deleteOne({ username: req.params.username });
		if (!user.n)
			return res.status(400).json({
				err: true,
				message: 'User does not exist',
			});
		res.json({
			success: true,
			message: 'User deleted successfully',
		});
	} catch (err) {
		res.status(400).json({ err });
	}
};

module.exports = {
	registerPost,
	loginPost,
	logoutGet,
	userGet,
	usersGet,
	updatePatch,
	deleteDelete,
};
