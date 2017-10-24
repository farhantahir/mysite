const express = require('express');
const IndexController = require('../controllers/IndexController');
const adminRoutes = require('./admin');

const router = express.Router();

router.get('/', IndexController.index);
router.get('/about', IndexController.about);
router.use(adminRoutes());

module.exports = router;
