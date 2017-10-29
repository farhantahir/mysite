const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	postTitle: {
		type: String,
		trim: true,
	},
	slug: String,
	published: Boolean,
	publishedDate: Date,
	description: String,
	content: String,
	thumbnail: String,
});

module.exports = PostSchema;

