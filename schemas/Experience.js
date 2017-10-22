const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
	jobTitle: String,
	company: String,
	description: {
		type: String,
		trim: true,
	},
	from: String,
	end: String,
	sort: Number,
	present: Boolean,

});


module.exports = ExperienceSchema;
