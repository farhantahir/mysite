const mongoose = require('mongoose');

const Project = mongoose.model('Project');
const Experience = mongoose.model('Experience');
const Post = mongoose.model('Post');

module.exports.index = async (req, res) => {
	const posts = await Post.find({ published: true }, null, {
		sort: {
			publihsedDate: -1,
		},
	});
	res.render('index', { posts });
};

module.exports.about = async (req, res) => {
	const projects = await Project.find().sort('sort');
	const experiences = await Experience.find().sort('sort');
	res.render('about', { projects, experiences });
};
