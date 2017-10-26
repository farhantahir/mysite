const mongoose = require('mongoose');

const Experience = mongoose.model('Experience');

module.exports.index = async (req, res) => {
	const experiences = await Experience.find();
	const rows = experiences.map(this.generateRecords);
	res.render('admin/experiences/index', { rows });
};

module.exports.generateRecords = (experience) => {
	{
		const newExperience = experience;
		newExperience.presentDisplay = (typeof experience.present !== 'undefined' && experience.present) ? 'Yes' : 'No';
		newExperience.actions = {
			editURL: `/admin/experiences/${experience._id}`,
			deleteURL: `/admin/experiences/${experience._id}`,
		};
		return newExperience;
	}
};

module.exports.new = (req, res) => {
	res.render('admin/experiences/experience');
};
module.exports.save = async (req, res) => {
	if (!req.params.id) {
		const experience = new Experience(req.body);
		await experience.save();
	} else {
		await Experience.findOneAndUpdate({ _id: req.params.id }, req.body);
	}
	req.flash('success', 'Experience saved successfully');
	res.redirect('/admin/experiences');
};

module.exports.edit = async (req, res) => {
	const experience = await Experience.findOne({ _id: req.params.id });
	res.render('admin/experiences/experience', { experience });
};

module.exports.delete = async (req, res) => {
	await Experience.remove({ _id: req.params.id});
	req.flash('success', 'Experience deleted successfully');
	res.redirect('/admin/experiences');
};
