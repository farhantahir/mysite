const passport = require('passport');
const mongoose = require('mongoose');
const crypto = require('crypto');
const Mail = require('../../handlers/mail');
const moment = require('moment');
const promisify = require('es6-promisify');

const User = mongoose.model('User');

module.exports.login = (req, res) => {
	res.render('admin/auth/login');
};

module.exports.loginPost = passport.authenticate('local', {
	failureRedirect: '/admin/login',
	failureFlash: 'Invalid Email or Password',
	successRedirect: '/admin',
	successFlash: 'Successfully Logged In!',
});


module.exports.logout = (req, res) => {
	req.logout();
	res.redirect('/admin');
};