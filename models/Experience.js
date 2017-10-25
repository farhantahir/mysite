const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const ExperienceSchema = require('../schemas/Experience');

mongoose.Promise = global.Promise;
ExperienceSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Experience', ExperienceSchema);
