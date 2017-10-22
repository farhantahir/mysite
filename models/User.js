const mongoose = require('mongoose');
const mongodbErrorHanlder = require('mongoose-mongodb-errors');

mongoose.Promise = global.Promise;
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = require('../schemas/User');


UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
UserSchema.plugin(mongodbErrorHanlder);
module.exports = mongoose.model('User', UserSchema);

