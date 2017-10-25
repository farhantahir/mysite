const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},
	published: Boolean,
	publishedDate: Date,
	description: String,
	content: String,
});

module.exports = PostSchema;

