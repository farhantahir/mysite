const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports.postDetail = async (req, res) => {
	const post = await Post.findOne({ slug: req.params.slug });
	res.render('post', { post });
};
