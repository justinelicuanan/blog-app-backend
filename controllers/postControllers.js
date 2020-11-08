const User = require('../models/User');
const Post = require('../models/Post');

// Create a post
const createPost = async (req, res) => {
	const { title, slug, body } = req.body;
	try {
		const post = await Post.create({
			title,
			slug,
			body,
			userId: req.user._id,
			authorName: req.user.name,
		});
		res.status(201).json({
			success: true,
			message: 'Post created successfully',
		});
	} catch (error) {
		let err = {};
		if (error._message === 'post validation failed') {
			Object.keys(error.errors).forEach((errPath) => {
				err[errPath] = error.errors[errPath].message;
			});
			return res.status(400).json({ err });
		}
		if (error.code === 11000 && error.keyPattern.slug) {
			err.slug = 'Slug is already in used';
			return res.status(400).json({ err });
		}
		res.status(400).json({ err: error });
	}
};

// Get single post
const postGet = async (req, res) => {
	try {
		const post = await Post.findOne({ slug: req.params.slug }).select(
			'-_id -__v'
		);
		if (!post)
			return res.status(400).json({
				err: true,
				message: 'Post does not exist',
			});
		res.json(post);
	} catch (err) {
		res.status(400).json({ err });
	}
};

// Get all posts of an author
const authorGet = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username });
		if (!user)
			return res.status(400).json({
				err: true,
				message: 'Author does not exist',
			});
		const posts = await Post.find({ userId: user._id }).select('-_id -__v');
		res.json(posts);
	} catch (err) {
		res.status(400).json({ err });
	}
};

// Get all posts
const postsGet = async (req, res) => {
	try {
		const posts = await Post.find().select('-_id -__v');
		res.json(posts);
	} catch (err) {
		res.status(400).json({ err });
	}
};

// Update a post
const updatePatch = async (req, res) => {
	const { title, slug, body } = req.body;
	const patch = {
		title,
		slug,
		body,
	};
	try {
		await Post.updateOne(
			{ slug: req.params.slug },
			{ $set: patch },
			{ runValidators: true }
		);
		res.status(200).json({
			success: true,
			message: 'Post updated successfully',
		});
	} catch (error) {
		let err = {};
		if (error._message === 'Validation failed') {
			Object.keys(error.errors).forEach((errPath) => {
				err[errPath] = error.errors[errPath].message;
			});
			return res.status(400).json({ err });
		}
		if (error.code === 11000 && error.keyPattern.slug) {
			err.slug = 'Slug is already in used';
			return res.status(400).json({ err });
		}
		res.status(400).json({ err: error });
	}
};

// Delete a post
const deleteDelete = async (req, res) => {
	try {
		const post = await Post.deleteOne({ slug: req.params.slug });
		if (!post.n)
			return res.status(400).json({
				err: true,
				message: 'Post does not exist',
			});
		res.json({
			success: true,
			message: 'Post deleted successfully',
		});
	} catch (err) {
		res.status(400).json({ err });
	}
};

module.exports = {
	createPost,
	postGet,
	authorGet,
	postsGet,
	updatePatch,
	deleteDelete,
};
