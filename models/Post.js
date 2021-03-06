const mongoose = require('mongoose');
const { isSlug } = require('validator');

// Create post schema
const PostSchema = mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Title field is required'],
		},
		slug: {
			type: String,
			lowercase: true,
			validate: [isSlug, 'Slug is invalid'],
			unique: true,
			required: [true, 'Slug field is required'],
		},
		body: {
			type: String,
			required: [true, 'Body field is required'],
		},
		userId: mongoose.ObjectId,
		authorName: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('post', PostSchema);
