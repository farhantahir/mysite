const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

mongoose.Promise = global.Promise;
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = require('../schemas/User');


UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
UserSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('User', UserSchema);

