const mongoose = require('mongoose');

const ProjectShchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},
	slug: String,
	description: {
		type: String,
		trim: true,
	},
	projectURL: String,
	tag: String,
	sort: Number,
});


module.exports = ProjectShchema;