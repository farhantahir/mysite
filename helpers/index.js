module.exports.redirectBack = (req, res) => {
	const backURL = req.header('Referer') || '/';
	res.redirect(backURL);
};
