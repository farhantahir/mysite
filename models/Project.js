const mongoose = require('mongoose');
const slugify = require('slugs');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const ProjectSchema = require('../schemas/Project');

mongoose.Promise = global.Promise;
ProjectSchema.pre('save', async function (next) {
	if (!this.isModified('title')) return next();
	this.slug = slugify(this.title);
	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
	const projectWithSlugs = await this.constructor.find({ slug: slugRegEx });
	if (projectWithSlugs.length) {
		this.slug = `${this.slug}-${projectWithSlugs.length + 1}`;
	}
	return next(); // move on saving
});
ProjectSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Project', ProjectSchema);
