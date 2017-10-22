const mongoose = require('mongoose');

const Project = mongoose.model('Project');

module.exports.index = async (req, res) => {
	const projects = await Project.find();
	const rows = projects.map((project) => {
		const newProject = project;
		newProject.actions = {
			editURL: `/admin/projects/${project.slug}`,
		};
		return newProject;
	});
	res.render('admin/projects/index', { rows });
};
