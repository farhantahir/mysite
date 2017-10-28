const express = require('express');
const IndexController = require('../controllers/site/IndexController');
const PostController = require('../controllers/site/PostController');
const adminRoutes = require('./admin');

const router = express.Router();

router.get('/', IndexController.index);
router.get('/about', IndexController.about);
router.get('/posts/:slug', PostController.postDetail);
router.use(adminRoutes());

module.exports = router;
