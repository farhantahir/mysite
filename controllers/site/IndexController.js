const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports.index = async (req, res) => {
	const posts = await Post.find({ published: true }, null, {
		sort: {
			publihsedDate: -1,
		},
	});
	res.render('index', { posts, activePage: 'home' });
};

module.exports.about = async (req, res) => {
	res.render('about',{ activePage: 'about' });
};

