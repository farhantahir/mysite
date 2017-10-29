const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const Post = mongoose.model('Post');


const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		if (file.mimetype.startsWith('image/')) {
			next(null, true);
		} else {
			next({ message: 'The uploaded file type is not allowed' }, false);
		}
	},
};


module.exports.index = async (req, res) => {
	const posts = await Post.find();
	const rows = posts.map(this.generateRecords);
	res.render('admin/posts/index', { rows });
};

module.exports.generateRecords = (post) => {
	{
		const newPost = post;
		newPost.publishedDisplay = (typeof post.published !== 'undefined' && post.published) ? 'Yes' : 'No';
		newPost.actions = {
			editURL: `/admin/posts/${post._id}`,
			deleteURL: `/admin/posts/${post._id}`,
		};
		return newPost;
	}
};


module.exports.new = (req, res) => {
	res.render('admin/posts/post');
};

module.exports.edit = async (req, res) => {
	const post = await Post.findOne({ _id: req.params.id });
	res.render('admin/posts/post', { post });
};
module.exports.uploadThumbnail = multer(multerOptions).single('thumbnail');
module.exports.resizeThumbnail = async (req, res, next) => {
	if (!req.file) {
		next();
		return;
	}
	const extension = req.file.mimetype.split('/')[1];
	req.body.thumbnail = `${uuid()}.${extension}`;
	const thumbnail = await jimp.read(req.file.buffer);
	const resizedThumbnail = await thumbnail.resize(200, 200);
	await resizedThumbnail.write(`./public/photos/posts/thumbnails/${req.body.thumbnail}`);
	next();
};
module.exports.save = async (req, res) => {
	if (!req.params.id) {
		const post = new Post(req.body);
		await post.save();
	} else {
		await Post.findOneAndUpdate({ _id: req.params.id }, req.body);
	}
	req.flash('success', 'Post saved successfully');
	res.redirect('/admin/posts');
};

module.exports.delete = async (req, res) => {
	await Post.remove({ _id: req.params.id });
	req.flash('success', 'Post deleted successfully');
	res.redirect('/admin/posts');
};

