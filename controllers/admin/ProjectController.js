const mongoose = require('mongoose');

const Project = mongoose.model('Project');

module.exports.index = async (req, res) => {
	const projects = await Project.find();
	const rows = projects.map(this.generateActions);
	res.render('admin/projects/index', { rows });
};

module.exports.new = (req, res) => {
	res.render('admin/projects/project');
};
module.exports.save = async (req, res) => {
	if (!req.params.slug) {
		const project = new Project(req.body);
		await project.save();
	} else {
		await Project.findOneAndUpdate({ slug: req.params.slug }, req.body);
	}
	req.flash('success', 'Project saved successfully');
	res.redirect('/admin/projects');
};

module.exports.edit = async (req, res) => {
	const project = await Project.findOne({ slug: req.params.slug });
	res.render('admin/projects/project', { project });
};

module.exports.delete = async (req, res) => {
	await Project.remove({ slug: req.params.slug });
	req.flash('success', 'Project deleted successfully');
	res.redirect('/admin/projects');
};

module.exports.generateActions = (project) => {
	{
		const newProject = project;
		newProject.actions = {
			editURL: `/admin/projects/${project.slug}`,
			deleteURL: `/admin/projects/${project.slug}`,
		};
		return newProject;
	}
};
