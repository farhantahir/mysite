const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const slugify = require('slugs');
const PostSchema = require('../schemas/Post');

mongoose.Promise = global.Promise;

PostSchema.pre('save', async function (next) {
	if (!this.isModified('postTitle')) return next();
	this.slug = slugify(this.postTitle);
	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
	const postWithSlugs = await this.constructor.find({ slug: slugRegEx });
	if (postWithSlugs.length) {
		this.slug = `${this.slug}-${postWithSlugs.length + 1}`;
	}
	return next(); // move on saving
});

PostSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Post', PostSchema);

