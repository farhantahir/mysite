const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		trim: true,
		validator: [validator.isEmail, 'Email is not a valid email'],
		required: 'Email is required',
	},
	name: {
		type: String,
		trim: true,
		required: 'Name is required',
	},
});

module.exports = UserSchema;
