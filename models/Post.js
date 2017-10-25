const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const PostSchema = require('../schemas/Post');

mongoose.Promise = global.Promise;

PostSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Post', PostSchema);

