const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = async (req, res, next) => {
	const user = await User.findOne({
		passwordResetToken: req.params.token,
		passwordResetExpiry: { $gt: Date.now() }
	});
	const error = [];
	if (!user) {
		error.push({ msg: 'Invalid Or Expired Reset Password token' });
		req.flash('error', error);
		return res.redirect(`/password/reset/${req.params.token}`);
	}
	next();
};
