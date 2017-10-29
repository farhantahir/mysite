const helpers = require('../helpers/');

module.exports.newProject = (req, res, next) => {
	req.checkBody({
		title: {
			notEmpty: true,
			errorMessage: 'Title is required',
		},
		description: {
			notEmpty: true,
			errorMessage: 'Description is required',
		},
		tag: {
			notEmpty: true,
			errorMessage: 'Tag is required',
		},
		projectURL: {
			isURL: true,
			errorMessage: 'Url must be valid url',
			optional: {
				options: { checkFalsy: true },
			},
		},
		sort: {
			isNumeric: true,
			errorMessage: 'Sort must be a number',
		},
	});

	const errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		return helpers.redirectBack(req, res);
	}
	next();
};

module.exports.newExperience = (req, res, next) => {
	req.checkBody({
		jobTitle: {
			notEmpty: true,
			errorMessage: 'Job Title is required',
		},
		company: {
			notEmpty: true,
			errorMessage: 'Company is required',
		},
		description: {
			notEmpty: true,
			errorMessage: 'Description is required',
		},
		from: {
			notEmpty: true,
			errorMessage: 'From Date is required',
		},
		sort: {
			isNumeric: true,
			errorMessage: 'Sort must be a number',
		},
	});

	const errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		return helpers.redirectBack(req, res);
	}
	return next();
};

module.exports.newPost = (req, res, next) => {
	req.checkBody({
		postTitle: {
			notEmpty: true,
			errorMessage: 'Title is required',
		},
		description: {
			notEmpty: true,
			errorMessage: 'Description is required',
		},
		publishedDate: {
			notEmpty: true,
			errorMessage: 'Published Date is required',
		},
		content: {
			notEmpty: true,
			errorMessage: 'Content is required',
		},
	});
	const errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		return helpers.redirectBack(req, res);
	}
	return next();
};
