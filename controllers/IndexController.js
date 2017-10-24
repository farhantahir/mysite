const mongoose = require('mongoose');

const Project = mongoose.model('Project');
const Experience = mongoose.model('Experience');
module.exports.index = async (req, res) => {
	res.render('index');
};

module.exports.about = async (req, res) => {
	const projects = await Project.find().sort('sort');
	const experiences = await Experience.find().sort('sort');
	res.render('about', { projects, experiences });
};
