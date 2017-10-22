const mongoose = require('mongoose');
const mongodbErrorHanlder = require('mongoose-mongodb-errors');
const ExperienceSchema = require('../schemas/Experience');

mongoose.Promise = global.Promise;
ExperienceSchema.plugin(mongodbErrorHanlder);
module.exports = mongoose.model('Experience', ExperienceSchema);
