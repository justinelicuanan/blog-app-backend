const Post = require('../models/Post');

// Verify if user is authenticated
const verifyAuth = (req, res, next) => {
	if (!req.isAuthenticated())
		return res.status(400).json({
			err: true,
			message: 'Please login to view this resource',
		});
	next();
};

// Don't let user in if already authenticated
const verifyUnauth = (req, res, next) => {};

// Verify the user
const verifyUser = (req, res, next) => {};

// Verify post author
const verifyAuthor = async (req, res, next) => {
	const post = await Post.findOne({ slug: req.params.slug });
	if (!post)
		return res.status(400).json({
			err: true,
			message: 'Post does not exist',
		});
	if (post.userId.equals(req.user._id) || req.user.role === 1) return next();
	res.status(401).json({
		err: true,
		message: "You don't have permission to view this resource",
	});
};

module.exports = {
	verifyAuth,
	verifyUnauth,
	verifyUser,
	verifyAuthor,
};
