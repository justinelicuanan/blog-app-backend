const mongoose = require('mongoose');
const { isSlug } = require('validator');

// Create user schema
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
			validate: [isSlug, 'Slug must only contain letters, numbers, and hypens'],
			unique: true,
			required: [true, 'Slug field is required'],
		},
		body: {
			type: String,
			required: [true, 'Body field is required'],
		},
		userId: mongoose.ObjectId,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('post', PostSchema);
