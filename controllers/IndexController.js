const mongoose = require('mongoose');

const Project = mongoose.model('Project');
const Experience = mongoose.model('Experience');
exports.index = async (req, res) => {
	const projects = await Project.find().sort('sort');
	const experiences = await Experience.find().sort('sort');
	res.render('index', { projects, experiences });
};
